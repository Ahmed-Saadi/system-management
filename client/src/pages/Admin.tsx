import React from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Dashbord } from "./admin/dashbord";
import { Accounts } from "./admin/accounts";
import { Materiel } from "./admin/materiel";
import { Notfound } from "./notfound";

import { Demande } from "./admin/demands";
import { Support } from "./admin/supportAdmin";
import {  Teams } from "./admin/Team";

export const Admin: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    return navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex">
        <div className="flex  bg-third-color font-color flex-col  w-56 h-screen ">
          <div className="flex flex-row justify-center text-4xl items-center py-12 mb-4">
            <img
              src="../public/images/system.png"
              alt="icon logo"
              className="h-20 w-20"
            />
            <h3 className="pl-4">PFE</h3>
          </div>
          <div className="flex flex-col">
            <Link to="teams">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img
                  src="../public/icons/team-admin-icon.svg"
                  alt="dash icon "
                />
                <p className="pl-4">Teams</p>
              </div>
            </Link>
            <Link to="demandes">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img src="../public/icons/demands-icon.svg" alt="dash icon" />
                <p className="pl-4">Demands</p>
              </div>
            </Link>
            <Link to="Materiel">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img src="../public/icons/materiel-icon.svg" alt="" />
                <p className="pl-4">Materiel</p>
              </div>
            </Link>
            <Link to="accounts">
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color">
                <img src="../public/icons/accounts-icon.svg" alt="" />
                <p className="pl-4">Accounts</p>
              </div>
            </Link>
            <Link to="support">
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color ">
                <img src="../public/icons/support-admin-icon.svg" alt="" />
                <p className="pl-4">support</p>
              </div>
            </Link>
              {/*you need a logout here*/}
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color hover:cursor-pointer " onClick={() =>logout()}>
                <img src="../public/icons/logout-icon.svg" alt="" />
                <p className="pl-4">Log out</p>
              </div>
          </div>
        </div>

        <Routes>
          <Route path="" element={<Dashbord />} />
          <Route path="demandes" element={<Demande />} />
          <Route path="teams" element={<Teams/>} />
          <Route path="materiel" element={<Materiel />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
};
