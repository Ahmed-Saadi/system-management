import { DragEvent, useState } from "react";
import { Header } from "../component/client/header";
import { Link, Route, Routes } from "react-router-dom";
import { Notfound } from "./notfound";
import { Tasks } from "./client/tasks";
import { CreateEmail } from "../component/client/createEmail";
import { Favorite } from "../component/client/favorite";
import { MessageDeleted } from "../component/client/messageDeleted";
import { MessageSent } from "../component/client/messageSent";
import { ReceptionEmails } from "../component/client/receptionEmails";
import { Support } from "./client/support";
import { Demande_Materiel } from "./client/demande_materiel";
import { Demande_Conger } from "./client/demande_congé";

export const Client = () => {
  const [isdemands, setIsDemands] = useState<Boolean>(false);
  const [isEmail, setIsEmail] = useState(false);
  const [] = useState();
  const [] = useState();
  const toggleDropdown = (choice: string) => {
    switch (choice) {
      case "1":
        setIsDemands(!isdemands);
        break;
      case "2":
        setIsEmail(!isEmail);
    }
  };
  return (
    <>
      <div className="h-screen w-screen">
        <Header />
        <div className=" flex h-full ">
          <div className="h-full text-center w-60 bg-green-200">
            <Link to="">
              <div className="bg-green-300 justify-start drop-down-style my-1">
                <img src="../public/icons/team-icon.svg" alt="create icon" />
                <h2 className="p-2">team</h2>
              </div>
            </Link>
            <button
              id="dropdownMenuButton"
              className="bg-green-300 drop-down-style w-full my-1"
              onClick={() => toggleDropdown("1")}
            >
              Demands
              {isdemands ? (
                <img src="../public/icons/arrow-up-icon.svg" alt="up icon" />
              ) : (
                <img
                  src="../public/icons/arrow-down-icon.svg"
                  alt="down icon"
                />
              )}
            </button>
            {isdemands && (
              <div>
                <Link to="m_demandes">
                  <div className="justify-start drop-down-style">
                    <img src="../public/icons/tool-icon.svg" alt="" />
                    <h2 className="p-2">demands material</h2>
                  </div>
                </Link>
                <Link to="c_demandes">
                  <div className="justify-start drop-down-style">
                    <img src="../public/icons/list-icon.svg" alt="" />
                    <h2 className="p-2">demands congées</h2>
                  </div>
                </Link>
              </div>
            )}

            <button
              id="dropdownMenuButton"
              className="bg-green-300 drop-down-style w-full my-1"
              onClick={() => toggleDropdown("2")}
            >
              Boit Email
              {isEmail ? (
                <img src="../public/icons/arrow-up-icon.svg" alt="up icon" />
              ) : (
                <img
                  src="../public/icons/arrow-down-icon.svg"
                  alt="down icon"
                />
              )}
            </button>
            {isEmail && (
              <div>
                <Link to="createNewEmail">
                  <div className="justify-start drop-down-style">
                    <img
                      src="../public/icons/create-icon.svg"
                      alt="create  icon"
                    />
                    <h2 className="p-2">New email</h2>
                  </div>
                </Link>

                <Link to="reception">
                  <div className="justify-start drop-down-style">
                    <img src="../public/icons/list-icon.svg" alt="" />
                    <h2 className="p-2">Reception</h2>
                  </div>
                </Link>

                <Link to="favorite">
                  <div className="justify-start drop-down-style">
                    <img
                      src="../public/icons/favorite-icon.svg"
                      alt="favorite icon"
                    />
                    <h2 className="p-2">favorite</h2>
                  </div>
                </Link>

                <Link to="messagesSent">
                  <div className="justify-start drop-down-style">
                    <img
                      src="../public/icons/send-email-icon.svg"
                      alt="sent icon"
                    />
                    <h2 className="p-2">message sent</h2>
                  </div>
                </Link>

                <Link to="messageDeleted">
                  <div className="justify-start drop-down-style">
                    <img
                      src="../public/icons/delete-icon.svg"
                      alt="deleted icon"
                    />
                    <h2 className="p-2">message deleted</h2>
                  </div>
                </Link>
              </div>
            )}
            <Link to="support">
              <div className="bg-green-300 justify-start drop-down-style my-1">
                <img src="../public/icons/support-icon.svg" alt="create icon" />
                <h2 className="p-2">Support</h2>
              </div>
            </Link>
          </div>

          <div className="h-full w-full">
            <Routes>
              <Route path="*" element={<Notfound />} />
              <Route path="" element={<Tasks  />} />
              <Route path="m_demandes" element={<Demande_Materiel />} />
              <Route path="c_demandes" element={<Demande_Conger />} />
              <Route path="createNewEmail" element={<CreateEmail />} />
              <Route path="reception" element={<ReceptionEmails />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="messagesSent" element={<MessageSent />} />
              <Route path="messageDeleted" element={<MessageDeleted />} />
              <Route path="support" element={<Support />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
