import { useEffect, useState } from "react";
import  {Row } from '../models/model.ts'
import axios from "axios";
import { AddMateriel } from "../component/addMateriel.tsx";

export const Materiel = () => {
  const [data,setData] = useState<Row[]>([]) 
  const [selectedRow, setSelectedRow] = useState<Row |null >(null);
  const [addMateriel,setaddMateriel] =useState< boolean | null >(null);
  const [update,setupdate] = useState<boolean >(true);
  const [modifyRow, setModify] = useState<Row | null>(null);

 

  useEffect(  () => {
       axios.get('http://localhost:8081/api/get',)
        .then(response => { 
            setData([...response.data]);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
      
}, [update]);


  function handleAdd() {
  setaddMateriel(true)
}


  function onEdit(e:React.FormEvent<HTMLFormElement>,row : Row) {
    e.preventDefault();
    const updatedData = data.map((item) => (item.m_id === row.m_id ? row : item));
    try{
      axios.put('http://localhost:8081/api/update',row)
    .then(() => setData(updatedData))

    }catch(error){
      console.log(error)
    }
    handleCloseModify();
  }

  function onDelete(index:Row) {
    try{
      axios.delete(`http://localhost:8081/api/del/${index.m_id}`).then(() => {setData([...data.filter((i) => i.m_id !== index.m_id)])
      setupdate(update => !update)
    }
    )
      
    }
    catch (e) {
      console.error('error has occupied : ',e)
    }
        
    
  }

  
  function handlesaveMaterial(status:boolean,one_row?:Row){
      if(one_row){
        setData([...data,one_row])
        setaddMateriel(status);
        setupdate(prevState => !prevState);
      
      }else{
        setaddMateriel(status)
      }
      
  }
 
  const handleModifyClick =(item: Row) => {
      setModify(item);
  }
  const handleCloseModify = () =>{
    setModify(null);
  
  }

  const handleviewClick = (item: Row) => {
    setSelectedRow(item);
  };
  const handleCloseModal = () => {
    setSelectedRow(null);
  };




  return (
    <>
    <div className="flex items-center flex-grow ">
      <div className="flex items-center flex-grow flex-col">
        <div className=" font-bold text-3xl">
          <h1>List de Materiel</h1>
        </div>
        <div className="flex-grow"></div>

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
      {data.map((item, index) => (
        <tr key={index} >
          <td className=' bg-slate-600 text-center text-white'>{item.name}</td>
          <td className='  bg-slate-600 text-center text-white'>{item.categorie}</td>
          <td className=' bg-slate-600  text-center text-white'>{item.owner}</td>
          <td className=' bg-slate-600  text-center text-white'>{item.date}</td>
          <td  className=' bg-slate-600 text-center w-80'>
          <button className="bg-blue-500 rounded-xl w-20 font-bold m-2" onClick={() => handleviewClick(item)}>show</button>
          <button className="bg-lime-500 rounded-xl w-20 font-bold m-2" onClick={() => handleModifyClick(item)}>Edit</button>
          <button className='bg-red-600 rounded-xl w-20 font-bold cursor-pointer m-2' onClick={() => onDelete(item)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
      
      
             {/*show the row */}

    {selectedRow && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75  " >
      <div className="bg-white p-14 rounded-lg flex flex-col h-[500px] w-[500px]">
        <div className="flex justify-end">
          <span className="cursor-pointer p-4 "  onClick={handleCloseModal}>
            &times;
          </span>
        </div>
        <p>Name: {selectedRow.name}</p>
        <p>categorie: {selectedRow.categorie}</p>
        <p>Owner: {selectedRow.owner}</p>
        <p>Date d'ajoute: {selectedRow.date}</p>
      </div>
    </div>)}

                {/* edit the row  */}

    {modifyRow && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" >
      <div className="bg-white p-14 rounded-lg flex flex-col">
        <div className="flex justify-end">
          <span className="cursor-pointer p-4 "  onClick={handleCloseModify}>
            &times;
          </span>
        </div>
        <form className="flex flex-col" onSubmit={(e) => onEdit(e,modifyRow)}>
        <p>Name: <input type="text" value={ modifyRow.name} onChange={(e) => setModify({ ...modifyRow, name: e.target.value })} /></p>
        <p>categorie: <input type="text" value={modifyRow.categorie} onChange={(e) => setModify({ ...modifyRow, categorie: e.target.value })}/></p>
        <p>Owner: <input type="text"  value={modifyRow.owner} onChange={(e) => setModify({ ...modifyRow, owner: e.target.value })}/></p>
        <p>Date d'ajoute: {modifyRow.date}</p>

        <button type="submit" className='modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'>valid</button>
        </form>
        
      </div>
    </div>)}

     

    {addMateriel && (<AddMateriel addMaterial={handlesaveMaterial}/>) }

      </div>
    </div>


    
 </>

);
};
