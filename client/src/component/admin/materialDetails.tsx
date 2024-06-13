import React from "react";
import { Material } from "../../models/model";

interface props {
  selectedRow: Material;
  handleModifyClick: (item: Material | null) => void;
  onDelete: (index: Material) => void;
  setSelectedRow:React.Dispatch<React.SetStateAction<Material | null>>;
  
}
export const MaterialDetails: React.FC<props> = ({
  handleModifyClick,
  selectedRow,
  onDelete,
  setSelectedRow,
  
}) => {
  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="bg-red-500  rounded-lg flex flex-col p-20">
          <h1 className="font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] text-center text-2xl rounded-full">
            material information
          </h1>
          <span className="flex items-center font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] ">
            <p className="px-2">Name :</p>
            <p className="px-2">{selectedRow.name}</p>
          </span>
          <span className="flex items-center font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] ">
            <p className="px-2">categorie : </p>
            <p className="px-2">{selectedRow.categorie}</p>
          </span>
          <span className="flex items-center font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] ">
            <p className="px-2">Owner : </p>
            {
              selectedRow.owner != null ? <p className="px-2 ">
              {selectedRow.owner?.username}
              {selectedRow.owner?.family_name}
              {selectedRow.owner?.profession}
            </p>:"-"
            }
          </span>
          <span className="flex items-center font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] ">
            <p className="px-2">Date d'ajoute : </p>
            <p className="px-2">{selectedRow.date}</p>
          </span>
          <div className="flex justify-center m-8">
          <button
            className=" material-Row-Btn hover:bg-forth-color p-2"
            onClick={() => {handleModifyClick(selectedRow)
              setSelectedRow(null)
            }}
          >
            <img src="./public/icons/edit-icon.svg" />
          </button>
          <button
            className="material-Row-Btn hover:bg-forth-color p-2"
            onClick={() => {onDelete(selectedRow)
              setSelectedRow(null)
            }}
          >
            <img src="./public/icons/delete-icon.svg" />
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
