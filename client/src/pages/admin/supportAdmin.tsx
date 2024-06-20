import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Import your models here
import { RequestTicket } from "../../models/model";
import api from "../../api/api";
import { useAccountStore } from "../../store/profileStore";

export const Support = () => {
  const [requests, setRequests] = useState<RequestTicket[]>([]);
  const [showRequest, setShowRequest] = useState<RequestTicket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setAccount, account } = useAccountStore((state: any) => ({
    account: state.account,
    setAccount: state.setAccount,
  }));


  useEffect(() => {
    api.get("/support/getsupportTockets").then((response) => {
      const sortedRequests = response.data.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setRequests(sortedRequests);
      
    });
  }, []);
  useEffect(()=>{
    api.post("/v1/auth/checkprivilege").then((response) => {
      console.log(response.data)
      setAccount(response.data);
    });
  },[showRequest])

  
  const handleClickEvent = (req: RequestTicket) => {
    setShowRequest(req);
  };

  const handleClickBtnSendMessage = (request: RequestTicket) => {
    const message = document.getElementById("message") as HTMLTextAreaElement;
    if (message.value.trim().length > 0) {
      const updatedRequest = { ...request, requestMessage: message.value,sender:account };

      api
        .post("/support/update", updatedRequest)
        .then((response) => {
          const updatedRequests = requests.map((req) =>
            req.id === response.data.id ? response.data : req
          );
          updatedRequests.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setRequests(updatedRequests);
          setShowRequest(response.data);
          message.value = "";
        })
        .catch((error) => {
          console.error("Error updating request:", error);
        });
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showRequest]);

  return (
    <>
      <div className=" w-full flex flex-col bg-first-color border-2 h-screen">
        <div className="h-full ">
          <div className="flex justify-center items-center p-4 m-4 bg-white shadow-xl text-3xl font-bold rounded-full">
            <h1>Support</h1>
          </div>
          <div className="flex w-full  mx-4 h-[80%]">
            <div className="w-[30%] bg-white mx-2 rounded-2xl shadow-lg p-3 flex flex-col ">
              <div className="flex  my-2 justify-end items-center rounded-md flex-col">
                {requests.length > 0 ?
                  requests.map((req: RequestTicket) => (
                    <span
                      className="h-16 py-2 w-full flex justify-center items-center shadow-md rounded-md bg-gray-100 my-1 shadow-gray-300 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleClickEvent(req)}
                      key={req.id}
                    >
                      {req.subject}
                    </span>
                  )) : <p className="text-xl font-semibold my-16 bg-none">tu n'a aucune demande pour le moment</p>}
              </div>
            </div>

            <div className="mx-2 bg-[#ECFFFD] w-[66%] rounded-2xl shadow-lg p-3">
              {showRequest && (
                <div className="flex flex-col shadow rounded-lg overflow-hidden ">
                  <div className="flex justify-between items-center bg-white my-1 font-semibold px-2 text-2xl">
                    <h1>{showRequest.subject}</h1>
                    <h1>
                      Status:
                      <span className="text-green-400">
                        {showRequest.status}
                      </span>
                    </h1>
                  </div>
                  <div className="bg-white p-4 shadow-inner rounded-lg h-[500px] overflow-y-auto flex-col flex">
                    {showRequest.supportMessagesList?.map((message) => (
                        message.sender?.u_id === account.u_id ? (<div className="mx-4 flex flex-col" key={message.id}>
                          <p className="text-xs p-1 self-end">
                            {new Date(message.sentAt).toLocaleString()}
                          </p>
                          <div className="bg-green-100 p-2 rounded-md">
                            {message.content}
                          </div>
                        </div>):(<div className="mx-4 flex flex-col" key={message.id}>
                          <p className="text-xs p-1 self-start">
                            {new Date(message.sentAt).toLocaleString()}
                          </p>
                          <div className="bg-blue-100 p-2 rounded-md">
                            {message.content}
                          </div>
                        </div>)
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex justify-start items-start ">
                    <textarea
                      id="message"
                      className="w-[90%] m-4 focus:outline-none shadow-md resize-none h-40 p-4 rounded-md"
                    ></textarea>
                    <button
                      className="my-4 bg-blue-500 text-white p-2 rounded-md"
                      onClick={() => handleClickBtnSendMessage(showRequest)}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
