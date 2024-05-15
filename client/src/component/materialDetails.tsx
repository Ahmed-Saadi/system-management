import React from "react";
import { Row } from "../models/model";

interface props {
  setSelectedRow: React.Dispatch<React.SetStateAction<Row | null>>;
  selectedRow: Row;
}
export const MaterialDetails: React.FC<props> = ({
  setSelectedRow,
  selectedRow,
}) => {
  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75  ">
        <div className="bg-first-color  rounded-lg flex flex-col p-20">
          <div className="flex justify-end">
            <span className=" closeBtn m-2 " onClick={handleCloseModal}>
              <img src="../public/icons/close-icon.svg" alt="close btn" />
            </span>
          </div>
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
            <p className="px-2 ">{selectedRow.owner?.username} | {selectedRow.owner?.user_family_name} | {selectedRow.owner?.profession} </p>
          </span>
          <span className="flex items-center font-semibold my-2 mx-4 justify-between p-2 bg-[#F5F5F5] ">
            <p className="px-2">Date d'ajoute : </p> 
            <p className="px-2">{selectedRow.date}</p>
          </span>
        </div>
      </div>
    </>
  );
};
