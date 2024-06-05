import React from "react";
import { TaskInterface } from "../../models/model";

interface props {
  showTask: TaskInterface;
  setShowTask:React.Dispatch<React.SetStateAction<TaskInterface | null>>;
}
export const ShowTaskRow: React.FC<props> = ({ showTask,setShowTask }) => {
    const handleCloseBtn = () => {
        setShowTask(null);
    }
  return (
    <>
      <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-2xl p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold text-blue-800">
              {showTask.title}
            </h2>
            <button
              className="text-gray-600 hover:text-gray-900"
            onClick={handleCloseBtn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Description:</strong> {showTask.description}
            </p>
            <p className="text-gray-700">
              <strong>Assignee:</strong> {showTask.assignee}
            </p>
            <p className="text-gray-700">
              <strong>Date:</strong> {showTask.date}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {showTask.status}
            </p>
          </div>
          <div className="mt-6">
           
           
              {showTask.files.map((file) => (
                <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
              >
                <span className="text-gray-700">{file.filename} ({file.fileType})</span>
                <a
                  href={file.filepath}
                  download
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </a>
              </div>
              ))}
            
          </div>
        </div>
      </div>
    </>
  );
};
