import axios from "axios";
import { useEffect, useState } from "react";
import { Email } from "../../models/model";
import { EmailDetail } from "./emailDetail";

export const Favorite = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;
  const [filterAccount, setFilterAccount] = useState<Email[]>([]);
  const [emailsToDelete, setEmailsTodelete] = useState<Email[]>([]);
  const [showRow,setSwhoRow] = useState<Email | null>(null)
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

  const totalPages = Math.ceil(emails.length / emailsPerPage);

  useEffect(() => {
    axios.get("http://localhost:8081/api/emails/favorites").then((response) => {
      setEmails([...response.data]);
    });
  }, []);

  const handleMakeFavorite = (email: Email) => {
    axios
      .put(`http://localhost:8081/api/emails/favorite/${email.id}`)
      .then((response) => {
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
      .post("http://localhost:8081/api/emails/deleteEmails", emailsToDelete)
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
            <div className="bg-white h-12 mt-4 mx-4 rounded-t-md">
              <button
                className="mx-4 w-12 h-12 flex justify-center items-center  hover:bg-gray-100 hover:rounded-full"
                onClick={handleBtnDelete}
              >
                <img src="../public/icons/delete-email-icon.svg" alt="" />
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
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleselectElements(e, email)}}
                />
              </span>
              <button
                className="w-1/12"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMakeFavorite(email)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`size-6 ${
                    email.favorite
                      ? "fill-current bg-red-500"
                      : "fill-current bg-green-500"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="w-2/12">{email.subject}</p>
              <p className="w-4/12">{email.content}</p>
              <p className="w-4/12">{email.reciver}</p>
            </div>
          ))}
          {emails.length === 0 && (
            <p className="self-center p-4 text-xl">
              Aucune conversation dans la boite Favorite{" "}
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
      </div>
      {showRow && <EmailDetail email={showRow} close={setSwhoRow}/>}
    </>
  );
};
