import React from "react";
import { Link } from "react-router-dom";
import { Client } from "../../pages/client";
import { Demands } from "../../pages/client/demands";

export const Header = () => {
  return (
    <>
      <div className="flex h-[50px] bg-red-200 ">
        <div className="flex-1 flex px-4 justify-between items-cent">
          <Link to="/">
            <div className="pr-4 flex items-center font-bold ">
              <img
                src="../public/images/system.png"
                alt="logo"
                className="max-h-[50px] p-2"
              />
              <h1>Mr world wide</h1>
            </div>
          </Link>
          
        </div>

        <div className=" relative inline-block px-8 p-1 h-full items-center flex-col group">
          <div className="flex items-center justify-center flex-1  ">
            <img
              src="../public/images/login.jpeg"
              alt=""
              className="max-h-[40px] rounded-full mx-2"
            />
            <p className="font-color font-semibold">example@gmail.com</p>
          </div>
          <div className=" absolute hidden  items-center justify-center group-hover:block w-full bg-red-200 ">
            <p className="h-[40px]  text-lg w-full hover:bg-red-700 cursor-pointer ">
              Profile
            </p>
            <p className="h-[40px]  text-lg w-full hover:bg-red-700 cursor-pointer ">
              Log Out
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
