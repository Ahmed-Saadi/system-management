import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Material_Demand, Row } from "../../models/model";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useDemandeStore } from "../../store/demad_store";
import api from "../../api/api";

interface props {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateDemande: React.FC<props> = ({ setIsAdd }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Material_Demand>({});

  const { addDemande } = useDemandeStore((state: any) => ({
    addDemande: state.addDemande,
  }));

  const typeValue = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {}, [typeValue]);

  const handleSubmitBtn: SubmitHandler<Material_Demand> = (
    demande: Material_Demand
  ) => {
    
    api
      .post("/demands/add", demande)
      .then((response) => {
        addDemande(response.data);
      });
    setIsAdd(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex justify-end "
        onClick={() => setIsAdd(false)}
      >
        <div
          className="bg-[#FAFAFA] w-[500px] flex flex-col items-center font-color"
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
            className="flex flex-col justify-center  m-2 mt-8 bg-first-color p-8 w-full text-xl "
            onSubmit={handleSubmit(handleSubmitBtn)}
          >
            <div className="mt-4 mb-2 justify-between flex">
              <label className="mr-4">Type demande : </label>
              <select
                className="flex-1 shadow-xl px-2 rounded-xl"
                {...register("type", {
                  required: "please select a the type",
                })}
              >
                <option value="">Select a type </option>
                <option value="reparation">Reparation</option>
                <option value="nouveau">Nouveau</option>
              </select>
            </div>
            <ErrorMessage
              errors={errors}
              name="type"
              render={({ message }) => (
                <p className=" mx-0 mb-2 ml-40 error-message">{message}</p>
              )}
            />

            {/*typeValue === "reparation" && (
              <>
                <div className="flex flex-col h-120 aut">
                  {materials.map((material) => (
                    <div>{material.name}</div>
                  ))}
                </div>
              </>
            )*/}
            {typeValue === "nouveau" && (
              <>
                <div className="mt-4 mb-2 justify-between flex ">
                  <label className="mr-24">Name :</label>
                  <input
                    type="text"
                    className=" flex-1 shadow-xl px-2 rounded-xl"
                    {...register("name", { required: "Enter the categorie" })}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="categorie"
                  render={({ message }) => (
                    <p className=" mx-0 mb-2 ml-40 error-message">{message}</p>
                  )}
                />
              </>
            )}

            <div className="mt-4 mb-2 justify-between flex ">
              <label className="mr-16">categorie :</label>
              <input
                type="text"
                className=" flex-1 shadow-xl px-2 rounded-xl"
                {...register("categorie", { required: "Enter the categorie" })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="categorie"
              render={({ message }) => (
                <p className=" mx-0 mb-2 ml-40 error-message">{message}</p>
              )}
            />

            <div className="my-6 flex justify-between">
              <label className="mr-12">Description : </label>
              <textarea
                className="h-[200px] flex-1 shadow-xl px-2 rounded-xl"
                {...register("description", {
                  required: "adding a description would be helpful",
                })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <p className=" mx-0 mb-2 ml-40 error-message">{message}</p>
              )}
            />
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
