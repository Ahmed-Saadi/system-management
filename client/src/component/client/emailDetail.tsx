
import React from 'react';
import { Email } from '../../models/model';

interface Props {
  email: Email;
  close:React.Dispatch<React.SetStateAction<Email | null>>;
}

export const EmailDetail: React.FC<Props> = ({ email ,close}) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 mx-4 relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => close(null)}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{email.subject}</h2>
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
            {email.reciver.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{email.reciver}</p>
            <p className="text-sm text-gray-500">{email.date}</p>
          </div>
        </div>
        <div className="overflow-y-auto max-h-80 mb-4">
          <p className="text-gray-700 whitespace-pre-wrap">{email.content}</p>
        </div>
        {email.files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Attachments</h3>
            <div className="space-y-2">
              {email.files.map((file) => (
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
        )}
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => close(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
