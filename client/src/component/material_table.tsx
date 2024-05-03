import React, { useState } from 'react';
import { AddMateriel } from './addMateriel.tsx';
import {Row} from '../models/model.ts'





const TableComponent:React.FC<{ data: Row[] }> = ({ data }) => {
  
  const [selectedRow, setSelectedRow] = useState<Row |null >(null);
  const [duplicate_data,setnewData] =useState<Row[]>(data)
  const [addMateriel,setaddMateriel] =useState< boolean| null>(null)
  
  
  

  function onEdit() {

  }
  function onDelete(index:Row) {
        const newdata =  duplicate_data.filter((row)=>
            row.name !== index.name
        )
        setnewData(newdata);
  }
  function handleAdd() {
     setaddMateriel(true)

  }
  function handlesaveMaterial(status:boolean){
      setaddMateriel(status)
  }
 
  
  const handleviewClick = (item: Row) => {
    setSelectedRow(item);
  };
  const handleCloseModal = () => {
    setSelectedRow(null)
  };

  return (
    <>
    <div className='flex flex-col'>
        <div className='flex justify-end'><button  className='bg-blue-500 rounded-3xl font-bold w-24 h-8 ' onClick={handleAdd}>Add Row</button></div>
      <table>
        <thead>
          <tr>
            <th className='h-14 w-40 bg-slate-700 text-xl'>Name</th>
            <th className='h-14 w-40 bg-slate-700 text-xl'>Categorie</th>
            <th className='h-14 w-40 bg-slate-700 text-xl'>owner</th>
            <th className='h-14 w-40 bg-slate-700 text-xl'>date d'ajoute</th>
            <th className='h-14 w-40 bg-slate-700 text-xl'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {duplicate_data.map((item, index) => (
            <tr key={index} >
              <td className=' bg-slate-600 text-center text-white'>{item.name}</td>
              <td className='  bg-slate-600 text-center text-white'>{item.categorie}</td>
              <td className=' bg-slate-600  text-center text-white'>{item.owner}</td>
              <td className=' bg-slate-600  text-center text-white'>{item.date}</td>
              <td  className=' bg-slate-600 text-center w-80'>
              <button className="bg-blue-500 rounded-xl w-20 font-bold m-2" onClick={() => handleviewClick(item)}>show</button>
              <button className="bg-lime-500 rounded-xl w-20 font-bold m-2" onClick={() => onEdit()}>Edit</button>
              <button className='bg-red-600 rounded-xl w-20 font-bold cursor-pointer m-2' onClick={() => onDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>

        {selectedRow && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 " >
          <div className="bg-white p-14 rounded-lg flex flex-col">
            <div className="flex justify-end">
              <span className="cursor-pointer p-4 "  onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <p>Name: {selectedRow.name}</p>
            <p>Age: {selectedRow.categorie}</p>
            <p>Owner: {selectedRow.owner}</p>
            <p>Date d'ajoute: {selectedRow.date}</p>
          </div>
        </div>)}

         

        {addMateriel && (<AddMateriel addMaterial={handlesaveMaterial}/>) }
     </>
  
  );
};


   

export default TableComponent;
