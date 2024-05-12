import React from "react";
import { Account } from "../models/model";


interface props {
  rowAccount: Account;
  handleCloseClick(): void;
  setEditRowAccount(data:Account) :void
  deleteaccount(int:number ):void
}

export const AccountDetail: React.FC<props> = ({
  rowAccount,
  handleCloseClick,
  setEditRowAccount,
  deleteaccount
}) => {
  const closeTheComponent = () => {
    handleCloseClick();
  };

  const handleRowDataChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: Account
  ) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    switch (name) {
      case "editBtn":
        setEditRowAccount({ ...data });
        break;
      case "blockBtn":
        console.log("the block button is working hahahhahah");
        break;
      case "deleteBtn":
        if(data.u_id){
          deleteaccount(data.u_id)
        }
        
        break
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75  ">
      <div className="bg-white p-14 rounded-lg flex flex-col h-[500px] w-[500px]">
        <div className="flex justify-end">
          <span className="cursor-pointer p-4 " onClick={closeTheComponent}>
            &times;
          </span>
        </div>
        <p>Name : {rowAccount.username}</p>
        <p>Familly Name : {rowAccount.user_family_name}</p>
        <p>Email : {rowAccount.email}</p>
        <p>Phone Number : {rowAccount.phone_number}</p>
        <p>Date of Birth : {rowAccount.dob}</p>
        <p>Profession : {rowAccount.profession}</p>
        <p>Gender : {rowAccount.gender}</p>
        <div className="flex  h-14   w-full justify-center items-center my-auto ">
          <button
            className="bg-amber-400  p-4 m-2 rounded-xl flex-grow-0"
            name="editBtn"
            onClick={(e) => handleRowDataChange(e,rowAccount)}
          >
            edit
          </button>
          <button
            className="bg-green-200  p-4 m-2 rounded-xl flex-grow-0"
            name="blockBtn"
            onClick={(e) => handleRowDataChange(e,rowAccount)}
          >
            block
          </button>
          <button
            className="bg-blue-500  p-4 m-2 rounded-xl flex-grow-0"
            name="deleteBtn"
            onClick={(e) => handleRowDataChange(e,rowAccount)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};
