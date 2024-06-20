import axios from "axios";
import React, { useEffect, useState } from "react";
import { Email } from "../../models/model";
import { EmailDetail } from "../../component/client/emailDetail";
import api from "../../api/api";

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
  const [showRow, setShowRow] = useState<Email | null>(null);

  useEffect(() => {
    api
      .get("/emails/deletedemails")
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      const searchEmails = emails.filter((email) =>
        email.receiver.email.startsWith(value)
      );
      setFilterAccount([...searchEmails]);
    } else {
      setFilterAccount([]);
    }
  };

  const handleSelectElements = (
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
    api.post("/emails/deleteEmailsforever", emailsToDelete).then((response) => {
      const deletedEmailIds = response.data.map((email: Email) => email.id);
      const updatedEmails = emails.filter(
        (email) => !deletedEmailIds.includes(email.id)
      );
      setEmails(updatedEmails);
      setEmailsTodelete([]);
    });
  };

  const handleBtnRestore = () => {
    api.post("/emails/restoreEmail", emailsToDelete).then((response) => {
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
      <div className="flex flex-col justify-start bg-gray-100 h-full">
        <input
          type="text"
          className="w-[45%] mx-4 mt-4 text-2xl rounded-2xl px-2 bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleInputChange}
        />

        {filterAccount.length > 0 && (
          <div className="rounded-b-md max-h-[300px] overflow-y-auto scrollbar z-50 fixed top-[98px] w-[40%] bg-white mx-4 text-xl shadow-md">
            {filterAccount.map((email) => (
              <div key={email.id} className="flex items-center sticky">
                <div className="mx-2">
                  <img src="../public/icons/email-icon.svg" alt="email-icon" />
                </div>
                <div className="flex flex-col p-2">
                  <p>{email.subject}</p>
                  <p>{email.receiver.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col max-h-[80%] m-2 bg-white overflow-y-auto scrollbar shadow-lg h-full">
          {emailsToDelete.length > 0 && (
            <div className="bg-white h-16 mt-4 mx-4 rounded-t-md shadow-sm flex mb-2 items-center  ">
              <button
                className="mx-4 w-84 h-12 flex justify-center items-center hover:bg-gray-200 rounded-full px-4 bg-gray-100"
                onClick={handleBtnDelete}
              >
                Supprimer définitivement
              </button>
              <button
                className="mx-4 w-84 h-12 flex justify-center items-center hover:bg-gray-200 rounded-full px-4 bg-gray-100"
                onClick={handleBtnRestore}
              >
                Restaurer
              </button>
            </div>
          )}
          {currentEmails.map((email) => (
            <div
              key={email.id}
              className="flex flex-col border-b-2 border-gray-200 p-4 mx-2 hover:bg-gray-200"
              onClick={() => setShowRow(email)}
            >
              <div className="flex">
                <span className="w-3/12">
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectElements(e, email);
                    }}
                    className="h-full w-1/5"
                  />
                </span>
                <p>to: {email.receiver.email}</p>
              </div>

              {email.files.length > 0 && (
                <div className="flex mx-4 my-2 py-2">
                  {email.files.map((file) => (
                    <div
                      key={file.id}
                      className="truncate px-2 h-8 w-40 border-2 border-gray-300 mx-2 rounded-md"
                    >
                      {file.filename}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {emails.length === 0 && (
            <p className="self-center p-4 text-xl">
              Aucune conversation dans la corbeille
            </p>
          )}
        </div>

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
                alt="arrow previous"
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
                alt="arrow next"
              />
            </button>
          </div>
        )}
      </div>
      {showRow && <EmailDetail email={showRow} close={setShowRow} />}
    </>
  );
};
