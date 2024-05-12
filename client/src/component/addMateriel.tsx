import React, { useEffect, useState } from "react";
import { Row } from "../models/model";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface props {
  addMaterial: (status: boolean, material?: Row) => void;
  modifyRow: Row | null;
  setModify: React.Dispatch<React.SetStateAction<Row | null>>;
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
}
const emptyRow = {
  name: "",
  categorie: "",
  owner: "",
  date: "",
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
  const [addDate, setAddDate] = useState<string>("");

  useEffect(() => {
    setAddDate(new Date().toLocaleString());
  }, []);

  const handleSubmitBtn: SubmitHandler<Row> = (newMaterial: Row) => {
    console.log(newMaterial)
    if (newMaterial.m_id) {
      axios
        .put("http://localhost:8081/api/update", newMaterial)
        .then((response) => {
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
      newMaterial.date = addDate;
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 flex-col">
      <div className=" bg-white m-20 p-14">
        <div className="p-8 font-bold text-3xl flex ">
          <h1>Add new materiel</h1>
          <button
            className=" to-stone-900 bg-red-600 rounded-full mx-3.5 w-10 justify-self-end"
            onClick={handleCloseBtn}
          >
            X
          </button>
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleSubmitBtn)}
        >
          <span className="font-bold">
            <label>Name : </label>
            <input
              {...register("name", { required: "please enter the name" })}
            />
          </span>
          <span className="font-bold">
            <label>Categorie : </label>
            <input
              {...register("categorie", { required: "enter the categorie" })}
            />
          </span>
          <span className="font-bold">
            <label>Owner : </label>
            <input {...register("owner")} />
          </span>

          <button
            type="submit"
            className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};
