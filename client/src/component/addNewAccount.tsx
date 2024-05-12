import axios from "axios";
import React, { useEffect, useState } from "react";
import { Account } from "../models/model.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const default_value_account = {
  user_family_name: "",
  username: "",
  email: "",
  phone_number: "",
  dob: "",
  profession: "",
  gender: "",
};
interface props {
  handleAccount: (status: boolean, account?: Account) => void;
  myaccount?: Account | null;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

export const AddNewAccount: React.FC<props> = ({
  handleAccount,
  myaccount,
  setAccounts,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>({
    defaultValues: myaccount ? myaccount : default_value_account,
  });

  const handleCloseButoonForm = () => {
    handleAccount(false);
  };
  const handleSubmitButton: SubmitHandler<Account> = (newAccount: Account) => {
    if (newAccount.u_id) {
      axios
        .put(`http://localhost:8081/api/user/edit`, newAccount)
        .then((response) => {
          setAccounts((prevState: Account[]) => {
            const index = prevState.findIndex((account) => account.u_id === newAccount.u_id);
            if (index !== -1) {
                const updatedAccounts = [...prevState];
                updatedAccounts[index] = {...response.data};
                return updatedAccounts;
            }
            return prevState;})
        handleAccount(false,newAccount);
        });
     
    } else {
      axios
        .post("http://localhost:8081/api/user/add", newAccount)
        .then((response) => {
          
          setAccounts((prevState: Account[]) => [...prevState, response.data]);
          console.log("post likhdmat")
        });
      handleAccount(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 flex-col">
        <div className="bg-white flex flex-col ">
          <button
            className=" bg-red-400 text-black  h-8 w-8 rounded-full self-end  m-1 "
            onClick={handleCloseButoonForm}
          >
            X
          </button>
          <form
            onSubmit={handleSubmit(handleSubmitButton)}
            className="flex flex-col"
          >
            <div className="flex justify-between w-96 px-4 font-semibold">
              <label>Name :</label>
              <input
                {...register("username", {
                  required: "this shit is required ",
                })}
                className="w-4/5"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <div>
              <label>Familly Name : </label>
              <input
                {...register("user_family_name", {
                  required: "please put some shit here",
                })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="user_family_name"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <div>
              <label>Email : </label>
              <input
                {...register("email", {
                  required: "please enter your email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "enter a valid email exemple@domain.com",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className=" bg-red-300 rounded-sm">{message}</p>
                )}
              />
            </div>
            <div>
              <label>Phone Number : </label>
              <input
                {...register("phone_number", {
                  required: "Please enter your phone number",
                  pattern: {
                    value: /^\+(?:[0-9] ?){10}[0-9]$/,
                    message: "Invalid phone number format",
                  },
                })}
                placeholder="+212-000-000-000"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="phone_number"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <div>
              <label>Date Of Birth : </label>
              <input
                {...register("dob", {
                  required: "please enter your date of  birth",
                })}
                type="date"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="dob"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <div>
              <label>Profession : </label>
              <input
                {...register("profession", {
                  required: "please enter the profession",
                })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="profession"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <div>
              <label>Gender : </label>
              <select
                {...register("gender", {
                  required: "please select the gender",
                  validate: (value) =>
                    value !== "" || "Please select a gender ",
                })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <ErrorMessage
              errors={errors}
              name="gender"
              render={({ message }) => (
                <p className=" bg-red-300 rounded-sm">{message}</p>
              )}
            />
            <button type="submit" className=" w-1/2 self-center">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
