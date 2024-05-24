import React from "react";
import { Account } from "../../models/model";

interface props {
  rowAccount: Account;
  handleCloseClick(): void;
  setEditRowAccount(data: Account): void;
  deleteaccount(int: number): void;
}

export const AccountDetail: React.FC<props> = ({
  rowAccount,
  handleCloseClick,
  setEditRowAccount,
  deleteaccount,
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
        if (data.u_id) {
          deleteaccount(data.u_id);
        }

        break;
    }
  };

  return (
    <div className=" flex items-center justify-center bg-first-color  h-full flex-col py-8 border-2 flex-grow p-8 text-xl font-semibold">
        <div className="p-4 my-4 bg-white w-2/3 text-center shadow-md rounded-full"><h1>Account Info</h1></div>
        <div className="acount-info"><p className="p-2">Name :</p> <p className="p-2">{rowAccount.username}</p></div>
        <div className="acount-info"><p className="p-2">Familly Name :</p> <p className="p-2">{rowAccount.family_name}</p></div>
        <div className="acount-info"><p className="p-2">Email :</p> <p className="p-2"> {rowAccount.email}</p></div>
        <div className="acount-info"><p className="p-2">Phone Number :</p> <p className="p-2"> {rowAccount.phone_number}</p></div>
        <div className="acount-info"><p className="p-2">Date of Birth :</p> <p className="p-2"> {rowAccount.dob}</p></div>
        <div className="acount-info"><p className="p-2">Profession :</p> <p className="p-2">  {rowAccount.profession}</p></div>
        <div className="acount-info"><p className="p-2">Gender : </p> <p className="p-2"> {rowAccount.gender}</p></div>
       
       
        
        <div className="flex  h-14   w-full justify-center items-center my-16 ">
          <button
            className="bg-green-400  p-4 m-2 rounded-xl flex-grow-0"
            name="editBtn"
            onClick={(e) => handleRowDataChange(e, rowAccount)}
          >
           <img src="../public/icons/edit-icon.svg" alt="edit" />
          </button>
          <button
            className="bg-red-600  p-4 m-2 rounded-xl flex-grow-0"
            name="blockBtn"
            onClick={(e) => handleRowDataChange(e, rowAccount)}
          >
            <img src="../public/icons/block-icon.svg" alt="block" />
          </button>
          <button
            className="bg-gray-500  p-4 m-2 rounded-xl flex-grow-0"
            name="deleteBtn"
            onClick={(e) => handleRowDataChange(e, rowAccount)}
          >
            <img src="../public/icons/delete-icon.svg" alt="delete" />
          </button>
        </div>
      </div>
    
  );
};
