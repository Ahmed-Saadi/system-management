import { useState, useEffect } from "react";

interface props {
  status: string | null;
  setMessage:React.Dispatch<React.SetStateAction<string | null>>;
}

const ModalSuccess: React.FC<props> = ({ status ,setMessage}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setMessage(null)
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
          className={` text-white p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${
            isExiting ? "animate-fadeOut" : "animate-fadeIn"
          } ${status === "sent" ? "bg-green-500" : "bg-red-500"}`}
        >
          {status === "sent" ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Success!</h2>
              <p>Your email was sent.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Error!</h2>
              <p>Error has ocured pelase try later.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalSuccess;
