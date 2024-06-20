import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RequestTicket } from "../../models/model";
import api from "../../api/api";
import { useAccountStore } from "../../store/profileStore";

export const Support = () => {
  const [addNewRequest, setAddNewRequest] = useState<boolean>(true);
  const [requests, setRequests] = useState<RequestTicket[]>([]);
  const [showRequest, setShowRequest] = useState<RequestTicket | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestTicket>({});
  const { setAccount, account } = useAccountStore((state: any) => ({
    account: state.account,
    setAccount: state.setAccount,
  }));

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/support/get").then((response) => {
      
      const sortedRequests = response.data.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setRequests(sortedRequests);

      
    });
  }, [showRequest]);
  useEffect(()=>{
    api.post("/v1/auth/checkprivilege").then((response) => {
      setAccount(response.data);
    });
  },[])

  const handleClickBtn = () => {
    setAddNewRequest(true);
    setShowRequest(null);
  };

  const handleClickEvent = (req: RequestTicket) => {
    setAddNewRequest(false);
    setShowRequest(req);
  };

  const submitForm = (request: RequestTicket) => {
    const myObject = { ...request, sender: account };
    
    api
      .post("/support/create", myObject,{ headers: {
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        const updatedRequests = [response.data, ...requests];
        updatedRequests.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setRequests(updatedRequests);
        setAddNewRequest(false);
        setShowRequest(response.data);
        reset();
      });
  };

  const handleClickBtnSendMessage = (request: RequestTicket) => {
    const message = document.getElementById("message") as HTMLTextAreaElement;
    if (message.value.trim().length > 0) {
      const updatedRequest = { ...request, requestMessage: message.value ,sender:account};

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
      <div className="h-full w-full flex flex-col bg-gray-100">
        <div className="flex justify-center items-center p-4 m-4 bg-white shadow-xl text-3xl font-bold rounded-full">
          <h1>Support</h1>
        </div>
        <div className="flex w-full h-[80%] mx-4">
          <div className="w-[30%] bg-white mx-2 rounded-2xl shadow-lg p-3 flex flex-col">
            <div className="flex shadow-lg my-2 h-16 justify-end items-center rounded-md">
              <button
                className="bg-blue-500 rounded-md px-2 h-12 mx-4 text-white hover:bg-blue-700"
                onClick={handleClickBtn}
              >
                New Request
              </button>
            </div>
            <div className="flex shadow-lg my-2 justify-end items-center rounded-md flex-col overflow-y-auto">
              {requests.length > 0 &&
                requests.map((req: RequestTicket) => (
                  <span
                    className="h-16 py-2 w-full flex justify-center items-center shadow-md rounded-md bg-gray-100 my-1 shadow-gray-300 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleClickEvent(req)}
                    key={req.id}
                  >
                    {req.subject}
                  </span>
                ))}
            </div>
          </div>

          <div className="mx-2 bg-white w-[66%] rounded-2xl shadow-lg p-3">
            {addNewRequest && (
              <div className="flex flex-col">
                <div className="flex flex-col p-6 bg-white rounded shadow-md w-1/2 mx-auto mt-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Create Support Ticket
                  </h2>
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                      />
                      {errors.subject && (
                        <p className="text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold">
                        Type
                      </label>
                      <select
                        {...register("type", {
                          required: "Type is required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded py-2 px-3"
                      >
                        <option value="">Select type</option>
                        <option value="probleme_materiel">
                          j'ai un problem au materiel...
                        </option>
                        <option value="problem_logiciel">
                          j'ai un problem dans l'application...
                        </option>
                        <option value="problem_email">
                          j'ai un problem dans la boite email...
                        </option>
                        <option value="autre">autre</option>
                      </select>
                      {errors.type && (
                        <p className="text-red-600">{errors.type.message}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold">
                        Message
                      </label>
                      <textarea
                        {...register("requestMessage", {
                          required: "Message is required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 h-[300px] resize-none scrollbar"
                      />
                      {errors.requestMessage && (
                        <p className="text-red-600">
                          {errors.requestMessage.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
                      >
                        Create Ticket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showRequest && (
              <div className="flex flex-col shadow rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-white my-1 font-semibold px-2 text-2xl">
                  <h1>{showRequest.subject}</h1>
                  <h1>
                    Status:
                    <span className="text-green-400">{showRequest.status}</span>
                  </h1>
                </div>
                <div className="bg-white p-4 shadow-inner rounded-lg h-[500px] overflow-y-auto flex-col flex">
                  {showRequest.supportMessagesList?.map((message) => (
                    message.sender?.u_id === account.u_id ? (<div className="mx-4 flex flex-col" key={message.id}>
                    <p className="text-xs p-1 self-end">
                      {new Date(message.sentAt).toLocaleString()}
                    </p>
                    <div className="bg-green-100 p-2 rounded-md ">
                      {message.content}
                    </div>
                  </div>):(<div className="mx-4 flex flex-col" key={message.id}>
                    <p className="text-xs p-1 self-start">
                      {new Date(message.sentAt).toLocaleString()}
                    </p>
                    <div className="bg-blue-100 p-2 rounded-md text-end">
                      {message.content}
                    </div>
                  </div>)
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex justify-start items-start">
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
    </>
  );
};
