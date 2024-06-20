import { useEffect, useState } from "react";
import { Account } from "../../models/model";
import { AddNewAccount } from "../../component/admin/addNewAccount";
import { AccountDetail } from "../../component/admin/accountDetail";
import DataTable from "../../component/admin/table_admin";
import api from "../../api/api";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [rowAccount, setRowAccount] = useState<Account | null>(null);
  const [addAccount, setAddAccount] = useState<boolean>(false);
  const [editRowAccount, setEditRowAccount] = useState<Account | null>(null);

  useEffect(() => {
    api.get("/user/get").then((response) => setAccounts([...response.data]));
  }, []);

  const handleClickNewAccount = () => {
    setAddAccount(true);
  };

  const handleAccount = (status: boolean, account?: Account) => {
    setAddAccount(status);
    setEditRowAccount(null);
    if (account) {
      setRowAccount(account);
    }
  };

  const deleteAccount = (id: number) => {
    api.delete(`/user/del/${id}`).then((response) => {
      console.log(response);
      const newaccounts = accounts.filter((element) => element.u_id !== id);
      setAccounts([...newaccounts]);
      setRowAccount(null);
    });
  };

  return (
    <>
      <div className="flex flex-grow items-start bg-first-color text-font-color w-full">
        <div className="flex items-center flex-col my-4">
          <h1 className="font-bold text-4xl py-4 bg-white p-6 rounded-3xl shadow-lg">
            List of Accounts
          </h1>
          <button
            className="rounded-3xl font-bold w-40 h-8 p-1 m-8 bg-second-color shadow-md hover:bg-forth-color self-end mr-44"
            onClick={handleClickNewAccount}
          >
            Add Account
          </button>
          <DataTable
            data={accounts}
            columns={[
              "u_id",
              "firstname",
              "lastname",
              "email",
              "phone_number",
              "dob",
              "profession",
              "gender",
            ]}
            handleviewClick={setRowAccount}
          />
        </div>
        {rowAccount && (
          <AccountDetail
            rowAccount={rowAccount}
            setEditRowAccount={setEditRowAccount}
            deleteaccount={deleteAccount}
          />
        )}
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
