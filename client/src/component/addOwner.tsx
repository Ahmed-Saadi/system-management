import axios from "axios";
import React, { useEffect, useState } from "react";
import { Account, Owner } from "../models/model";

interface props{
  setOwner: React.Dispatch<React.SetStateAction<Owner | null>>;
  owner? :Owner|null;
}
export const AddOwner: React.FC<props> = ({setOwner,owner}) => {


  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filterAccounts, setFilteredAccounts] = useState<Account[]>([]);
  useEffect(() => {
    axios.get("http://localhost:8081/api/user/get").then((response) => {
      setAccounts([...response.data]);
      setFilteredAccounts([...response.data]);
    });
  }, []);

  const handlechangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const searchAccounts = accounts.filter((account) =>
      account.username.startsWith(value)
    );
    setFilteredAccounts([...searchAccounts]);
  };

  const handleClickevent = (account: Account) => {
    const {u_id,username,user_family_name,profession} = account;
      setOwner({u_id,username,user_family_name,profession});
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="span-costum-configuration">
          <label>owner : </label>
          <input
            type="text"
            className="input-costum-configuration"
            onChange={(e) => handlechangeinput(e)}
          />
        </div>
        <div className="ml-24 w-2/3 text-center bg-white">
          {" "}
          <ul className="max-h-[120px] overflow-x-auto scrollbar">
            {filterAccounts.map((account: Account) => (
              <li
                className="p-2 border-2 rounded-lg bg-[#f8f4f4] font-color font-semibold cursor-pointer "
                onClick={() => handleClickevent(account)}
                key={account.u_id}
              >
                {account.username} , {account.profession}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
