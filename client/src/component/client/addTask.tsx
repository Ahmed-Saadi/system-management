import React, { ChangeEvent, useState } from "react";
import { TaskInterface } from "../../models/model";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ModalSuccess from "./ModalSuccess";
import EmailLoder from "./EmailLoader";
import axios from "axios";
import { useTaskStore } from "../../store/TaskStore";
import api from "../../api/api";

interface props {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FileWithId {
  id: string;
  file: File;
}

export const AddTask: React.FC<props> = ({ setAdd }) => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [message, setMessage] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addTask } = useTaskStore((state: any) => ({
    addTask: state.addTask,
  }));

  const handleCloseBtn = () => {
    setAdd(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInterface>({});

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.getElementById("file-input")?.click();
  };
  const handleFileDelete = (id: string) => {
    const newListFiles = files.filter((fileWithId) => fileWithId.id !== id);
    setFiles(newListFiles);
  };

  const handleSubmitBtn: SubmitHandler<TaskInterface> = async (
    task: TaskInterface
  ) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("description", task.description);
      formData.append("assignee", task.assignee);
      if (files) {
        files.forEach((fileWithId) =>
          formData.append("files", fileWithId.file)
        );
      }

      const response = await api.post("/task/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      addTask(response.data);
      setMessage("sent");
      setAdd(false);
    } catch (error) {
      setMessage("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed z-50 top-12 bg-red-100 w-full h-full flex justify-center items-center bg-opacity-10"
        onClick={handleCloseBtn}
      >
        <form
          className="bg-white w-[35%] max-h-[80%] flex flex-col p-4"
          onClick={(event) => event.stopPropagation()}
          onSubmit={handleSubmit(handleSubmitBtn)}
        >
          <div className="flex justify-between items-center border-b p-3">
            <input
              type="text"
              placeholder="Title....."
              className="flex-grow  rounded-md shadow-md h-8 mr-8 p-2 focus:outline-none"
              {...register("title", { required: "its required" })}
            />
            <button onClick={handleCloseBtn} className="text-red-500 text-3xl">
              &times;
            </button>
          </div>
          <div className="mt-4">
            <div className="mt-4 flex  justify-start items-center mx-4 ">
              <p className="mr-4 w-32 ">
                <strong>Description : </strong>
              </p>
              <textarea
                className="flex-grow  rounded-md shadow-md h-40  p-2 focus:outline-none  resize-none overflow-y-auto scrollbar"
                {...register("description", { required: "its required" })}
              ></textarea>
            </div>
            <div className="mt-4 flex  justify-start items-center mx-4 ">
              <p className="mr-4 w-32 ">
                <strong>Assignee : </strong>
              </p>
              <input
                type="text"
                className="flex-grow rounded-md shadow-md h-8 p-2 focus:outline-none"
                {...register("assignee", { required: "its required" })}
              />
            </div>
            <div className="mt-4 flex  justify-between  items-center mx-4 ">
              <p className="mr-4 w-32 ">
                <strong>Files : </strong>
              </p>

              <button
                className="bg-red-200 w-36 h-8 rounded-md font-bold"
                onClick={handleButtonClick}
              >
                Add file
              </button>
            </div>
            <div className="mt-4 flex flex-col justify-between  items-center mx-4 max-h-72 overflow-y-auto scrollbar">
              {files.length > 0 &&
                files.map((file) => (
                  <div
                    className="border p-1 flex justify-between items-center "
                    key={file.id}
                  >
                    <p className="flex-grow mr-6 ">{file.file.name}</p>
                    <button onClick={() => handleFileDelete(file.id)}>
                      <img
                        src="../public/icons/close-icon.svg"
                        alt="close icon"
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCloseBtn}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Save
            </button>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e)}
              className="hidden"
              id="file-input"
            />
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <EmailLoder />
        </div>
      )}
      {message && message === "sent" && (
        <ModalSuccess status={message} setMessage={setMessage} />
      )}
      {message && message === "error" && (
        <ModalSuccess status={message} setMessage={setMessage} />
      )}
    </>
  );
};
