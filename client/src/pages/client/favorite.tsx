import axios from "axios";
import { useEffect, useState } from "react";
import { Email } from "../../models/model";
import { EmailDetail } from "../../component/client/emailDetail";
import api from "../../api/api";

export const Favorite = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;
  const [filterAccount, setFilterAccount] = useState<Email[]>([]);
  const [emailsToDelete, setEmailsTodelete] = useState<Email[]>([]);
  const [showRow, setSwhoRow] = useState<Email | null>(null);
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

  const totalPages = Math.ceil(emails.length / emailsPerPage);

  useEffect(() => {
    api.get("/emails/favorites").then((response) => {
      setEmails([...response.data]);
    });
  }, []);

  const handleMakeFavorite = (email: Email) => {
    api.put(`/emails/favorite/${email.id}`).then((response) => {
      const updatedEmail = response.data;
      setEmails((prevEmails) =>
        prevEmails.filter((e) => e.id !== updatedEmail.id)
      );
    });
  };

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
        email.receiver.email.startsWith(value)
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
    api.post("/emails/deleteEmails", emailsToDelete).then((response) => {
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
          onChange={(e) => handlechangeinput(e)}
        />
        {filterAccount.length > 0 && (
          <div className="rounded-b-md max-h-[300px] overflow-y-auto scrollbar z-50 fixed top-[98px] w-[40%] bg-white mx-4 text-xl shadow-lg">
            {filterAccount.map((email) => (
              <div
                key={email.id}
                className="flex items-center p-2 border-b-2 border-gray-300 bg-gray-50 hover:bg-gray-200"
              >
                <div className="mx-2">
                  <img src="../public/icons/email-icon.svg" alt="Email Icon" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{email.subject}</p>
                  <p className="text-gray-500">{email.receiver.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col max-h-[80%] m-2 bg-white overflow-y-auto scrollbar rounded-md shadow-lg h-full">
          {emailsToDelete.length > 0 && (
            <div className="bg-white h-12 mt-4 mx-4 rounded-t-md flex items-center justify-start">
              <button
                className="mx-12 w-12 h-12 flex justify-center items-center hover:bg-gray-100 rounded-full "
                onClick={handleBtnDelete}
              >
                <img
                  src="../public/icons/delete-email-icon.svg"
                  alt="Delete Icon"
                />
              </button>
            </div>
          )}
          {currentEmails.map((email) => (
            <div
              key={email.id}
              className="flex border-b-2 border-gray-200 p-2 mx-2 hover:bg-gray-100 cursor-pointer h-12"
              onClick={() => setSwhoRow(email)}
            >
              <span className="w-1/12 flex justify-center items-center h-full">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleselectElements(e, email);
                  }}
                  className="h-full w-1/6"
                />
              </span>
              <button
                className="w-1/12 flex justify-center items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMakeFavorite(email);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-6 w-6 ${
                    email.favorite ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="w-2/12 truncate font-semibold">{email.subject}</p>
              <p className="w-4/12 truncate">{email.content}</p>
              <p className="w-4/12 truncate text-gray-500">
                {email.receiver.email}
              </p>
            </div>
          ))}
          {emails.length === 0 && (
            <p className="self-center p-4 text-xl">
              Aucune conversation dans la boite Favorite{" "}
            </p>
          )}
        </div>
        {emails.length > emailsPerPage && (
          <div className="h-8 flex bg-white mx-4 rounded-b-md justify-between items-center px-4 shadow">
            <button
              onClick={handlePreviousPage}
              className={`px-2 py-1 hover:bg-gray-500 text-white rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              <img src="../public/icons/arrow-back-icon.svg" alt="arrow back" />
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
      {showRow && <EmailDetail email={showRow} close={setSwhoRow} />}
    </>
  );
};
