import { useState } from "react";
import { Header } from "../component/client/header";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Notfound } from "./notfound";
import { Tasks } from "./client/tasks";
import { CreateEmail } from "../component/client/createEmail";
import { Favorite } from "./client/favorite";
import { MessageDeleted } from "./client/messageDeleted";
import { MessageSent } from "./client/messageSent";
import { ReceptionEmails } from "./client/receptionEmails";
import { Support } from "./client/support";
import { Demande_Materiel } from "./client/demande_materiel";
import { Demande_Conger } from "./client/demande_congé";
import { Profile } from "./client/profile";

export const Client = () => {
  const [isDemands, setIsDemands] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const toggleDropdown = (choice: string) => {
    switch (choice) {
      case "1":
        setIsDemands(!isDemands);
        break;
      case "2":
        setIsEmail(!isEmail);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return navigate("/", { replace: true });
  };

  return (
    <>
      <div className="h-screen w-screen">
        <div className="flex h-[50px] bg-gray-800 text-white shadow-lg">
          <div className="flex-1 flex px-4 justify-between items-center">
            <Link to="/">
              <div className="pr-4 flex items-center font-bold">
                <img
                  src="/images/system.png"
                  alt="logo"
                  className="max-h-[50px] p-2"
                />
                <h1 className="text-xl">Mr. Worldwide</h1>
              </div>
            </Link>
          </div>

          <div className="relative inline-block px-8 p-1 h-full items-center flex-col group">
            <div className="flex items-center justify-center flex-1">
              <img
                src="/images/login.jpeg"
                alt="user avatar"
                className="max-h-[40px] rounded-full mx-2"
              />
              <p className="font-semibold">example@gmail.com</p>
            </div>
            <div className="absolute hidden items-center justify-center group-hover:block w-full bg-gray-800 text-white">
             <Link to="profile">
             <p className="h-[40px] text-lg w-full hover:bg-gray-700 cursor-pointer">
                Profile
              </p>
             </Link>
              <p
                className="h-[40px] text-lg w-full hover:bg-gray-700 cursor-pointer"
                onClick={logout}
              >
                Log Out
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          <div className="h-full text-center w-60 bg-gray-100 border-r border-gray-300">
            <Link to="">
              <div className="bg-gray-200 flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                <img
                  src="/icons/team-icon.svg"
                  alt="team icon"
                  className="w-5 h-5 mr-2"
                />
                <h2 className="text-lg">Team</h2>
              </div>
            </Link>

            <button
              id="dropdownMenuButton"
              className="bg-gray-200 flex items-center justify-between p-2 my-1 w-full rounded-md hover:bg-gray-300 transition"
              onClick={() => toggleDropdown("1")}
            >
              <span>Demands</span>
              {isDemands ? (
                <img
                  src="/icons/arrow-up-icon.svg"
                  alt="up icon"
                  className="w-4 h-4"
                />
              ) : (
                <img
                  src="/icons/arrow-down-icon.svg"
                  alt="down icon"
                  className="w-4 h-4"
                />
              )}
            </button>
            {isDemands && (
              <div className="ml-4">
                <Link to="m_demandes">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/tool-icon.svg"
                      alt="tool icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Demands Material</h2>
                  </div>
                </Link>
                <Link to="c_demandes">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/list-icon.svg"
                      alt="list icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Demands Congées</h2>
                  </div>
                </Link>
              </div>
            )}

            <button
              id="dropdownMenuButton"
              className="bg-gray-200 flex items-center justify-between p-2 my-1 w-full rounded-md hover:bg-gray-300 transition"
              onClick={() => toggleDropdown("2")}
            >
              <span>Boit Email</span>
              {isEmail ? (
                <img
                  src="/icons/arrow-up-icon.svg"
                  alt="up icon"
                  className="w-4 h-4"
                />
              ) : (
                <img
                  src="/icons/arrow-down-icon.svg"
                  alt="down icon"
                  className="w-4 h-4"
                />
              )}
            </button>
            {isEmail && (
              <div className="ml-4">
                <Link to="createNewEmail">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/create-icon.svg"
                      alt="create icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">New Email</h2>
                  </div>
                </Link>

                <Link to="reception">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/list-icon.svg"
                      alt="list icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Reception</h2>
                  </div>
                </Link>

                <Link to="favorite">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/favorite-icon.svg"
                      alt="favorite icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Favorite</h2>
                  </div>
                </Link>

                <Link to="messagesSent">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/send-email-icon.svg"
                      alt="send icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Message Sent</h2>
                  </div>
                </Link>

                <Link to="messageDeleted">
                  <div className="flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                    <img
                      src="/icons/delete-icon.svg"
                      alt="delete icon"
                      className="w-5 h-5 mr-2"
                    />
                    <h2 className="text-lg">Message Deleted</h2>
                  </div>
                </Link>
              </div>
            )}

            <Link to="support">
              <div className="bg-gray-200 flex items-center justify-start p-2 my-1 rounded-md hover:bg-gray-300 transition">
                <img
                  src="/icons/support-icon.svg"
                  alt="support icon"
                  className="w-5 h-5 mr-2"
                />
                <h2 className="text-lg">Support</h2>
              </div>
            </Link>
          </div>

          <div className="h-full w-full p-4 bg-gray-50">
            <Routes>
              <Route path="*" element={<Notfound />} />
              <Route path="" element={<Tasks />} />
              <Route path="m_demandes" element={<Demande_Materiel />} />
              <Route path="c_demandes" element={<Demande_Conger />} />
              <Route path="createNewEmail" element={<CreateEmail />} />
              <Route path="reception" element={<ReceptionEmails />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="messagesSent" element={<MessageSent />} />
              <Route path="messageDeleted" element={<MessageDeleted />} />
              <Route path="support" element={<Support />} />
              <Route path="profile"  element={<Profile />}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
