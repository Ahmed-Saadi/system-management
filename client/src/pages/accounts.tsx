import  { useEffect, useState } from "react";
import { Account } from "../models/model";
import axios from "axios";
import { AddNewAccount } from "../component/addNewAccount";
import { AccountDetail } from "../component/accountDetail";



export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [rowAccount, setRowAccount] = useState<Account | null>(null);
  const [addAccount, setAddAccount] = useState<boolean>(false);
  const [editRowAccount, setEditRowAccount] = useState<Account | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/user/get")
      .then((response) => setAccounts([...response.data]));
  }, []);

  const handleclick = (item: Account) => {
    setRowAccount({ ...item });
  };

  const handleCloseClick = () => {
    setRowAccount(null);
  };

  const handleClickNewAccount = () => {
    setAddAccount(true);
  };

  const handleAccount = (status: boolean,account?:Account) => {
    setAddAccount(status);
    setEditRowAccount(null);
    if(account){
      setRowAccount(account)
    }
  };
  const deleteAccount = (id : number) => { 
      axios.delete(`http://localhost:8081/api/user/del/${id}`).then((response) =>{
      console.log(response)
      const newaccounts = accounts.filter((element) => element.u_id !== id);
      setAccounts([...newaccounts]);
      setRowAccount(null)
      })  
      
      
  }
 

  return (
    <>
      <div className="flex flex-col  items-center justify-center">
        <h1 className=" font-bold text-3xl border-black border-4 p-4">
          List of Accounts
        </h1>
        <button
          className="self-end m-2 bg-lime-400 rounded-full p-2 font-bold"
          onClick={handleClickNewAccount}
        >
          Create New Account
        </button>
        <div className="flex flex-col border-4 m-2 p-2 ">
          <table>
            <thead>
              <tr className="p-2 font-bold text-2xl ">
                <th className="w-52 h-4 text-center border-2">Name</th>
                <th className="w-52 h-4 text-center border-2">Familly Name</th>
                <th className="w-52 h-4 text-center border-2">Email</th>
                <th className="w-52 h-4 text-center border-2">Profession</th>
                <th className="w-52 h-4 text-center border-2">Phone Number</th>
                <th className="w-52 h-4 text-center border-2">Date Of Birth</th>
                <th className="w-52 h-4 text-center border-2">Gender</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item) => (
                <tr
                  key={item.u_id}
                  onClick={() => handleclick(item)}
                  className="cursor-pointer text-center"
                >
                  <td className="w-52 h-4  border-2">{item.username}</td>
                  <td className="w-52 h-4  border-2">
                    {item.user_family_name}
                  </td>
                  <td className="w-52 h-4  border-2">{item.email}</td>
                  <td className="w-52 h-4  border-2">{item.phone_number}</td>
                  <td className="w-52 h-4  border-2">{item.profession}</td>
                  <td className="w-52 h-4  border-2">{item.dob}</td>
                  <td className="w-52 h-4  border-2">{item.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*-------------show a row of data-------------- */}

      {rowAccount && (
        <AccountDetail
          rowAccount={rowAccount}
          handleCloseClick={handleCloseClick}
          setEditRowAccount={setEditRowAccount}
          deleteaccount={deleteAccount}
        />
      )}

      {/*------------- add an account-----------------*/}

      {(addAccount || editRowAccount) && (
        <AddNewAccount
          handleAccount={handleAccount}
          myaccount={editRowAccount}
          setAccounts={setAccounts}
        />
      )}
    </>
  );
};
