import axios from "axios";
import React, { useEffect, useState } from "react";
import { Email } from "../../models/model";
import { EmailDetail } from "./emailDetail";

export const MessageDeleted = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;
  const [filterAccount, setFilterAccount] = useState<Email[]>([]);
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);
  const [emailsToDelete, setEmailsTodelete] = useState<Email[]>([]);
  const [showRow,setSwhoRow] = useState<Email | null>(null)
  
 
  useEffect(() => {
    axios
      .get("http://localhost:8081/emails/deletedemails")
      .then((response) => setEmails([...response.data]));
  }, []);

  useEffect(() => {
    if (currentEmails.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [emails]);
 
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlechangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      const searchEmails = emails.filter((email) =>
        email.reciver.startsWith(value)
      );
      setFilterAccount([...searchEmails]);
    } else {
      setFilterAccount([]);
    }
  };
  const handleselectElements = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    email: Email
  ) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.checked) {
        setEmailsTodelete([...emailsToDelete, email]);
      } else {
        setEmailsTodelete([...emailsToDelete.filter((e) => e.id !== email.id)]);
      }
    }
  };
  const handleBtnDelete = () => {
    axios
      .post("http://localhost:8081/emails/deleteEmailsforever", emailsToDelete)
      .then((response) => {
        const deletedEmailIds = response.data.map((email: Email) => email.id);
        const updatedEmails = emails.filter(
          (email) => !deletedEmailIds.includes(email.id)
        );

        setEmails(updatedEmails);
        setEmailsTodelete([]);
      });
  };

  const handleBtnRestore = () => {
    axios
      .post("http://localhost:8081/emails/restoreEmail", emailsToDelete)
      .then((response) => {
        const deletedEmailIds = response.data.map((email: Email) => email.id);
        const updatedEmails = emails.filter(
          (email) => !deletedEmailIds.includes(email.id)
        );

        setEmails(updatedEmails);
        setEmailsTodelete([]);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-start bg-second-color h-full">
        <input
          type="text"
          className="w-[45%] mx-4  mt-4 text-2xl rounded-t-3xl px-2 bg-yellow-100"
          onChange={(e) => handlechangeinput(e)}
        />
         <div className="rounded-b-md  max-h-[300px]  overflow-y-auto scrollbar z-50 fixed top-[98px] w-[40%]  bg-red-100 mx-4 text-xl">
          
          {filterAccount.map((email) => (
            <div className="flex   items-center sticky">
              <div className="mx-2">
                <img src="../public/icons/email-icon.svg" alt="" />
              </div>
              <div key={email.id} className="flex flex-col  p-2">
                <p>{email.subject}</p>
                <p>{email.reciver}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col max-h-[80%] m-2 bg-white overflow-y-auto scrollbar ">
        {emailsToDelete.length > 0 && (
          <div className="bg-white h-12 mt-4 mx-4 rounded-t-md flex">
            <button
              className="mx-4 w-84 h-12 flex justify-center items-center  hover:bg-gray-200 rounded-full px-4 bg-slate-50"
              onClick={handleBtnDelete}
            >
              Supprimer définitivement
            </button>
            <button
              className="mx-4 w-84 h-12 flex justify-center items-center  hover:bg-gray-200 rounded-full px-4 bg-slate-50"
              onClick={handleBtnRestore}
            >
              restaurer
            </button>
          </div>
        )}
          {currentEmails?.map((email) => (
            <div
              key={email.id}
              className="flex  border-b-2 border-gray-200 p-2 mx-2 hover:bg-gray-100"
              onClick={() => setSwhoRow(email)}
            >
              <span className="w-1/12">
                <input type="checkbox"  onClick={(e)=>{e.stopPropagation()
                   handleselectElements(e,email) 
                }}/>
              </span>
              <img src="../public/icons/delete-email-icon.svg" alt="" />
              <p className="w-2/12">{email.subject}</p>
              <p className="w-4/12">{email.content}</p>
              <p className="w-4/12">{email.reciver}</p>
            </div>
          ))}

          {emails.length > emailsPerPage && (
            <div className="h-8 flex bg-white mx-4 rounded-b-md justify-end items-center">
              <button
                onClick={handlePreviousPage}
                className={`px-2 py-1 hover:bg-gray-500 text-white rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                <img
                  src="../public/icons/arrow-back-icon.svg"
                  alt="arrow next "
                />
              </button>
              <span className="text-xl">{`${indexOfFirstEmail + 1}-${
                indexOfLastEmail < emails.length
                  ? indexOfLastEmail
                  : emails.length
              } of ${emails.length}`}</span>
              <button
                onClick={handleNextPage}
                className={`px-2 py-1 hover:bg-gray-500 text-white rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentPage === totalPages}
              >
                <img
                  src="../public/icons/arrow-forward-icon.svg"
                  alt="arrow next "
                />
              </button>
            </div>
          )}
          {emails.length === 0 && (
            <p className="self-center p-4 text-xl">
              Aucune conversation dans la corbeille
            </p>
          )}
        </div>
      </div>
      {showRow && <EmailDetail email={showRow} close={setSwhoRow}/>}
    
    </>
  );
};
