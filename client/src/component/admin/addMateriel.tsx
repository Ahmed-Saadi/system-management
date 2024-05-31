import React, { useEffect, useState } from "react";
import { Account, Owner, Row } from "../../models/model";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddOwner } from "./addOwner";
import { ErrorMessage } from "@hookform/error-message";
import { Materiel } from "../../pages/admin/materiel";

interface props {
  addMaterial: (status: boolean, material?: Row) => void;
  modifyRow: Row | null;
  setModify: React.Dispatch<React.SetStateAction<Row | null>>;
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
}
const emptyRow = {
  name: "",
  categorie: "",
  owner: {},
};

export const AddMateriel: React.FC<props> = ({
  addMaterial,
  modifyRow,
  setModify,
  setData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Row>({ defaultValues: modifyRow ? modifyRow : emptyRow });

  const [Addowner, setAddOwner] = useState<boolean>(false);
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    if (modifyRow?.owner) {
      setOwner(modifyRow.owner);
    }
  }, []);

  const handleSubmitBtn: SubmitHandler<Row> = (newMaterial: Row) => {
    if (owner) {
      newMaterial = { ...newMaterial, owner };
    }

    if (newMaterial.m_id) {
      axios
        .put("http://localhost:8081/api/update", newMaterial)
        .then((response) => {
          console.log("this is the data come from the put : ", response.data);
          setData((prevState: Row[]) => {
            const index = prevState.findIndex(
              (row) => row.m_id === newMaterial.m_id
            );
            if (index !== -1) {
              const updatedRows = [...prevState];
              updatedRows[index] = { ...response.data };
              return updatedRows;
            }
            return prevState;
          });
        });
    } else {
      axios
        .post("http://localhost:8081/api/add", newMaterial)
        .then((response) =>
          setData((prevState: Row[]) => [...prevState, response.data])
        );
    }

    addMaterial(false);
    setModify(null);
  };

  const handleCloseBtn = () => {
    addMaterial(false);
    setModify(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 flex-col ">
      <div className=" bg-first-color  p-8 font-color rounded-2xl flex flex-col">
        <button className="closeBtn self-end my-4" onClick={handleCloseBtn}>
          <img src="../public/icons/close-icon.svg" alt="close Btn" />
        </button>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleSubmitBtn)}
        >
          <span className=" span-costum-configuration  ">
            <label>Name : </label>
            <input
              {...register("name", { required: "please enter the name" })}
              className="input-costum-configuration"
            />
          </span>
          <span className=" span-costum-configuration  ">
            <label>Categorie : </label>
            <input
              {...register("categorie", { required: "enter the categorie" })}
              className="input-costum-configuration"
            />
          </span>
          {!Addowner && !owner && (
            <p
              className="  text-center font-color font-semibold text-lg cursor-pointer w-2/3 border-2 py-1 m-2 self-center  hover:bg-forth-color"
              onClick={() => {
                setAddOwner(true);
              }}
            >
              Add an owner
            </p>
          )}

          {Addowner && (
            <AddOwner setOwner={setOwner} setAddowner={setAddOwner} />
          )}

          {owner && (
            <div className="span-costum-configuration">
              <p>Owner : </p>
              <div
                className="input-costum-configuration cursor-pointer"
                onClick={() => {
                  setOwner(null);
                  setAddOwner(true);
                }}
              >
                {owner.username} {owner.family_name} , {owner.profession}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="submit-button-costum w-1/3 self-center font-color font-semibold text-xl "
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};
