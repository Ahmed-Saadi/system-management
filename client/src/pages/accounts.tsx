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
    <div className="flex  flex-grow  items-start bg-first-color  font-color ">
      <div className="flex items-center flex-grow flex-col m-8 ">
        <h1 className=" font-bold text-4xl py- bg-white  p-6 rounded-3xl  shadow-md">
          List of Accounts
        </h1>
        <button
          className="rounded-3xl font-bold w-40 h-8 p-1 bg-second-color shadow hover:bg-forth-color self-end mx-8"
          onClick={handleClickNewAccount}
        >
          Add Account
        </button>
        
          <table className=" border-none bg-white shadow-md  rounded-3xl ">
            <thead >
              <tr className="p-2  font-semibold text-xl  border-b-2">
                <th className="table-Row-costum">Name</th>
                <th className="table-Row-costum">Familly Name</th>
                <th className="table-Row-costum">Email</th>
                <th className="table-Row-costum">Profession</th>
                <th className="table-Row-costum">Phone Number</th>
                <th className="table-Row-costum">Date Of Birth</th>
                <th className="table-Row-costum">Gender</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item) => (
                <tr
                  key={item.u_id}
                  onClick={() => handleclick(item)}
                  className="cursor-pointer text-center rounded text-lg h-14 hover:bg-slate-100"
                >
                  <td >{item.username}</td>
                  <td >
                    {item.user_family_name}
                  </td>
                  <td >{item.email}</td>
                  <td >{item.phone_number}</td>
                  <td >{item.profession}</td>
                  <td >{item.dob}</td>
                  <td >{item.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
       
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
      </div>
    </>
  );
};
