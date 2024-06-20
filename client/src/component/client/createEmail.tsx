import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Email } from "../../models/model";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailLoader from "./EmailLoader";
import ModalSuccess from "./ModalSuccess";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

interface FileWithId {
  id: string;
  file: File;
}

export const CreateEmail = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string[]>([]);
  const [receiverInput, setReceiverInput] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Email>({});

  useEffect(() => {
    api.get("/emails/findAllEmails").then((response) => {
      setEmails(response.data);
    });
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleFileDelete = (id: string) => {
    const newListFiles = files.filter((fileWithId) => fileWithId.id !== id);
    setFiles(newListFiles);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.getElementById("file-input")?.click();
  };

  const handleSubmitBtn: SubmitHandler<Email> = async (email: Email) => {
    if (!emails.includes(email.reciver)) {
      setError("reciver", {
        type: "manual",
        message: "Receiver email does not exist.",
      });
      return;
    }
    clearErrors("reciver");

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("subject", email.subject);
      formData.append("content", email.content);
      formData.append("receiver", email.reciver);
      if (files) {
        files.forEach((fileWithId) =>
          formData.append("files", fileWithId.file)
        );
      }

      await api.post("/emails/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("sent");
      navigate("../reception");
    } catch (error) {
      setMessage("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReceiverInput(value);
    if (value) {
      setSelectedEmail(emails.filter((email) => email.startsWith(value)));
    } else {
      setSelectedEmail([]);
    }
  };

  const handleEmailClick = (email: string) => {
    setValue("reciver", email);
    setReceiverInput(email);
    setSelectedEmail([]);
    clearErrors("reciver");
  };

  return (
    <>
      <div className="flex flex-col w-full h-full bg-gray-100 items-center">
        <div className="bg-blue-600 w-3/5 h-16 m-4 rounded-full flex justify-center items-center font-bold text-3xl text-white shadow-lg">
          <h1>Create New Email</h1>
        </div>
        <form
          className="flex flex-col items-start text-lg p-6 bg-white w-4/5 rounded-lg shadow-md"
          onSubmit={handleSubmit(handleSubmitBtn)}
        >
          <div className="flex w-full my-4">
            <label className="font-semibold text-gray-700">To:</label>
            <div className="relative w-[70%] mx-4">
              <input
                type="text"
                placeholder="Receiver"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={receiverInput}
                onChange={(e) => handleOnChange(e)}
              />
              {receiverInput && selectedEmail.length > 0 && (
                <div className="absolute top-full left-0 w-full border border-gray-300 rounded-md bg-white mt-1 shadow-lg z-10">
                  {selectedEmail.map((email) => (
                    <p
                      key={email}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleEmailClick(email)}
                    >
                      {email}
                    </p>
                  ))}
                </div>
              )}
              {errors.reciver && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reciver.message}
                </p>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="Subject..."
            className="my-4 w-[70%] mx-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            {...register("subject")}
          />
          <textarea
            placeholder="Your email..."
            className="my-4 w-[70%] mx-10 px-4 py-2 h-48 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
            {...register("content")}
          ></textarea>
          <div className="flex flex-col justify-end items-start max-h-52 self-center overflow-y-auto scrollbar mb-4 w-[70%] mx-4">
            {files.map((fileWithId) => (
              <div
                className="flex justify-between items-center text-lg bg-gray-200 p-2 rounded-md mb-2 w-full"
                key={fileWithId.id}
              >
                <p className="truncate w-[90%]">{fileWithId.file.name}</p>
                <button onClick={() => handleFileDelete(fileWithId.id)}>
                  <img
                    src="/icons/close-icon.svg"
                    alt="close icon"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-[70%] mx-4 mt-4">
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mx-4 hover:bg-blue-600 transition"
            >
              <img
                src="/icons/attach-file-icon.svg"
                alt="attach file icon"
                className="w-5 h-5"
              />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
            >
              <img
                src="/icons/send-icon.svg"
                alt="send icon"
                className="w-5 h-5"
              />
            </button>
          </div>
        </form>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e)}
          className="hidden"
          id="file-input"
        />
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <EmailLoader />
        </div>
      )}
      {message && <ModalSuccess status={message} setMessage={setMessage} />}
    </>
  );
};
