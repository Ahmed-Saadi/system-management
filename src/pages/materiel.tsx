import React from "react";
import TableComponent from "../component/tables";
import  {Row } from '../component/model.ts'

export const Materiel = () => {
  const data:Row[] = [
    { name: "John Doe", age: 30, role: "Developer" },
    { name: "Jane Smith", age: 25, role: "Designer" },
    { name: "Tom Brown", age: 35, role: "Manager" },
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
