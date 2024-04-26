import React from "react";
import TableComponent from "../component/tables";
import  {Row } from '../component/model.ts'

export const Materiel = () => {
  const data:Row[] = [
    { name: "pc", categorie:"informatique", owner: "ahmed",date:"" },
    { name: "casque", categorie:"informatique", owner: "mohamed",date:""},
    { name: "cahier", categorie:"changement", owner: "noureddine",date:""},
  ];
  
  return (
    <div className="flex items-center flex-grow ">
      <div className="flex items-center flex-grow flex-col">
        <div className=" font-bold text-3xl">
          <h1>List de Materiel</h1>
        </div>
        <div className="flex-grow"></div>
          <TableComponent data={data}/>
      </div>
    </div>
  );
};
