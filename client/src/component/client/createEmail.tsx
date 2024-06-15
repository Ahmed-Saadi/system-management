import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Email } from "../../models/model";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailLoder from "./EmailLoader";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Email>({});

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
      console.log("sh=ubject",formData.get("subject"))
      console.log("content",formData.get("content"))
      console.log(formData.get("receiver"))
      console.log(formData.get("files"))
      
      const response = await api.post(
        "/emails/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("sent");
      navigate("../reception")
    } catch (error) {
      setMessage("error");
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full bg-[#ffffaa] items-center">
        <div className="bg-white w-3/5 h-12 m-2 rounded-full flex justify-center items-center font-bold text-2xl">
          <h1>Create new Email</h1>
        </div>
        <form
          className="flex flex-col items-start text-3xl p-4 bg-[#ffffda] w-4/5"
          onSubmit={handleSubmit(handleSubmitBtn)}
        >
          <div className="flex w-full m-4">
            <label>to:</label>
            <input
              type="text"
              placeholder="receiver"
              className="w-[70%] mx-7 px-2"
              {...register("reciver", { required: "entre a reciver" })}
            />
          </div>
          <input
            type="text"
            placeholder="subject..."
            className="my-2 w-[70%] mx-20 px-2"
            {...register("subject")}
          />
          <textarea
            placeholder="your email...."
            className="my-2 w-[70%] mx-20 text-lg h-[400px] p-2 resize-none"
            {...register("content")}
          ></textarea>
          <div className="flex  flex-col justify-end items-start max-h-52 self-center overflow-y-auto scrollbar">
            {files.map((fileWithId) => (
              <div
                className="flex justify-center items-center text-lg bg-gray-400 p-2 truncate"
                key={fileWithId.id}
              >
                <p>{fileWithId.file.name}</p>
                <button onClick={() => handleFileDelete(fileWithId.id)}>
                  <img src="../public/icons/close-icon.svg" alt="close icon" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex text-sm justify-end mr-36 self-end">
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-gray-500 text-white rounded mx-4"
            >
              <img
                src="../public/icons/attach-file-icon.svg"
                alt="attach file icon"
              />
            </button>
            <button
              type="submit"
              onClick={() => handleSubmitBtn}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              <img src="../public/icons/send-icon.svg" alt="sent icon" />
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
        <div className="w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <EmailLoder />
        </div>
      )}
      {message && message === "sent" && <ModalSuccess status={message} setMessage={setMessage} />}
      {message && message === "error" && <ModalSuccess status={message} setMessage={setMessage} />}
    </>
  );
};
