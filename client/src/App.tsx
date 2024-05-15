import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Dashbord } from "./pages/dashbord";
import { Materiel } from "./pages/materiel";
import { Login } from "./pages/login";
import { Accounts } from "./pages/accounts.tsx";
import { Notfound } from "./pages/notfound.tsx";
import { Profile } from "./pages/profile.tsx";
import { useState } from "react";

function App() {
  const [status, setstatus] = useState<boolean>(true);

  const logout = () => {
    setstatus(false);
  };

  return status ? (
    <>
      <div className="flex">
        <div className="flex  bg-third-color font-color flex-col  w-56 h-screen ">
          <div className="flex flex-row justify-center text-4xl items-center">
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
                  src="../public/icons/dashboard_icon.png"
                  alt="dash icon "
                />
                <p className="pl-4">Dashboard</p>
              </div>
            </Link>
            <Link to="/Materiel">
              <div className="flex   items-center  text-2xl p-4 shadow hover:bg-second-color">
                <img src="../public/icons/materiel.png" alt="" />
                <p className="pl-4">Materiel</p>
              </div>
            </Link>
            <Link to="/accounts">
              <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color">
                <img src="../public/icons/accounts.png" alt="" />
                <p className="pl-4">Accounts</p>
              </div>
            </Link>
            <Link to="/profile">
            <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color">
              <img src="../public/icons/profile.png" alt="" />
              <p className="pl-4">Profile</p>
            </div>
            </Link>
            <Link to="" onClick={logout}>
                
              
            <div className="flex   items-center  text-2xl p-4 shadow  hover:bg-second-color ">
              <img src="../public/icons/logout.png" alt="" />
              <p className="pl-4">
              Log out
              </p>
            </div>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/materiel" element={<Materiel />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  ) : (
    <Login />
  );
}

export default App;
