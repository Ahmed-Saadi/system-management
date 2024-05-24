import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Dashbord } from "./admin/dashbord";
import { Accounts } from "./admin/accounts";
import { Materiel } from "./admin/materiel";
import { Notfound } from "./notfound";
import { Profile } from "./admin/profile";
import { Login } from "./login";
import { Demande } from "./admin/demands";

interface props {
  logout(status: boolean): void;
}

export const Admin: React.FC<props> = ({ logout }) => {
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
            <Link to="/dashboard">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img
                  src="../public/icons/dashboard-icon.svg"
                  alt="dash icon "
                />
                <p className="pl-4">Dashboard</p>
              </div>
            </Link>
            <Link to="/demandes">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img src="../public/icons/demands-icon.svg" alt="dash icon" />
                <p className="pl-4">Demands</p>
              </div>
            </Link>
            <Link to="/Materiel">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img src="../public/icons/materiel-icon.svg" alt="" />
                <p className="pl-4">Materiel</p>
              </div>
            </Link>
            <Link to="/accounts">
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color">
                <img src="../public/icons/accounts-icon.svg" alt="" />
                <p className="pl-4">Accounts</p>
              </div>
            </Link>
            <Link to="/profile">
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color">
                <img src="../public/icons/profile-icon.svg" alt="" />
                <p className="pl-4">Profile</p>
              </div>
            </Link>
            <Link to="" onClick={() => logout(false)}>
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color ">
                <img src="../public/icons/logout-icon.svg" alt="" />
                <p className="pl-4">Log out</p>
              </div>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/demandes" element={<Demande />}/>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/materiel" element={<Materiel />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
};
