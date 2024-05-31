import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useDemandeCongéStore, useDemandeStore } from "../../store/demad_store";
import { Demand_congéer } from "../../models/model";

interface props {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateDemandeCongé: React.FC<props> = ({ setIsAdd }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Demand_congéer>({});

  const { addDemande } = useDemandeCongéStore((state: any) => ({
    addDemande: state.addDemande,
  }));

  const typeValue = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {}, [typeValue]);

  const handleSubmitBtn: SubmitHandler<Demand_congéer> = (
    demande: Demand_congéer
  ) => {
    console.log(demande);
    axios
      .post("http://localhost:8081/api/demands/conger/add", demande)
      .then((response) => {
        addDemande(response.data);
      });
    setIsAdd(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex justify-end  font-semibold"
        onClick={() => setIsAdd(false)}
      >
        <div
          className="bg-[#7c7b7b] w-[500px] flex flex-col items-center font-color"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() => setIsAdd(false)}
            className="bg-white shadow inline-block hover:bg-gray-300 self-start"
          >
            <img src="../public/icons/double-arrow-icon.svg" alt="" />
          </button>
          <h2 className="p-2 m-2 bg-first-color shadow w-3/4 self-center text-center rounded-lg text-2xl">
            add a new demande :
          </h2>

          <form
            className="flex flex-col justify-center  m-2 mt-8  bg-gray-300 p-8 w-full text-xl "
            onSubmit={handleSubmit(handleSubmitBtn)}
          >
            <div className="flex  w-full justify-between mt-4 mb-2">
                <label>Name : </label>
                <input type="text"  {...register("name",{required:"please enter the name !"})} className="w-2/3 rounded-md p-2"/>
            </div>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className=" mx-0 mb-2 error-message self-end w-2/3">{message}</p>
              )}
            />
            <div className="flex  w-full justify-between mt-4 mb-2">
                <label>Type : </label>
                <select   {...register("type",{required:"please select the type !"})} className="w-2/3 rounded-md p-2 ">
                    <option value="">Select type de demande</option>
                    <option value="holiday">holiday</option>
                    <option value="quelque">quelque</option>
                    <option value="autre">autre </option>
                </select>
            </div>
            <ErrorMessage
              errors={errors}
              name="type"
              render={({ message }) => (
                <p className=" mx-0 mb-2 error-message self-end w-2/3 ">{message}</p>
              )}
            />
            <div className="flex  w-full justify-between mt-4 mb-2"> 
                <label >Date début : </label>
                <input type="date"   {...register("date_debut",{required:"please select start date !"})} className="w-2/3 rounded-md p-2"/>
            </div>
            <ErrorMessage
              errors={errors}
              name="date_debut"
              render={({ message }) => (
                <p className=" mx-0 mb-2 error-message self-end w-2/3">{message}</p>
              )}
            />
            <div className="flex  w-full justify-between mt-4 mb-2">
                <label >Date fin : </label>
                <input type="date" {...register("date_fin",{required:"please select end date !"})} className="w-2/3 rounded-md p-2"/>
            </div>
            <ErrorMessage
              errors={errors}
              name="date_fin"
              render={({ message }) => (
                <p className=" mx-0 mb-2 error-message self-end w-2/3">{message}</p>
              )}
            />
            <div className="flex  w-full justify-between mt-4 mb-2">
                <label>raison (optional): </label>
                <textarea placeholder="je veux prendre le congé pour ...." className=" w-2/3 rounded-md p-2 h-[200px] scrollbar" {...register("cause")}></textarea>
            </div>
            
           
            
           
            <button
              className="bg-green-500 self-center p-2 rounded-xl mt-12"
              type="submit"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
