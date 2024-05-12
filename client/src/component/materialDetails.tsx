import React from "react";
import { Row } from "../models/model";

interface props{ 
    setSelectedRow : React.Dispatch<React.SetStateAction<Row | null>>;
    selectedRow:Row;
}
export const MaterialDetails:React.FC<props> = ({setSelectedRow,selectedRow}) => {


    const handleCloseModal = () => { 
        setSelectedRow(null)
    }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75  ">
        <div className="bg-white p-14 rounded-lg flex flex-col h-[500px] w-[500px]">
          <div className="flex justify-end">
            <span className="cursor-pointer p-4 " onClick={handleCloseModal}>
              &times;
            </span>
          </div>
          <p>Name: {selectedRow.name}</p>
          <p>categorie: {selectedRow.categorie}</p>
          <p>Owner: {selectedRow.owner}</p>
          <p>Date d'ajoute: {selectedRow.date}</p>
        </div>
      </div>
    </>
  );
};
