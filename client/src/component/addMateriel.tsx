import React, { useEffect, useState } from 'react'
import {Row} from './model'



interface props{
  addMaterial: (data: Row) => void;

}

export const AddMateriel:React.FC<props> = ({addMaterial}) => {
  const [name,setName]=useState<string>('')
  const [categorie,setCategorie]=useState<string>('')
  const [owner,setOwner]=useState<string >()
  const [date,setDate] =useState<string>('')
  
  useEffect(() =>{
    const dateTronsform = new Date().toLocaleString()
     setDate(dateTronsform)
  },[])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          
          const material:Row = {name,categorie,owner,date}
          console.log(material)
          addMaterial(material)
    }

    return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 flex-col">
  <div className=' bg-white m-20 p-14'>
  <div className='p-8 font-bold text-3xl'><h1>Add new materiel</h1></div>
  <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)} >
  <span className='font-bold'><label>Name : </label><input type="text"  value={name} onChange={(event)=> setName(event.target.value)}/></span>
  <span className='font-bold'><label>Categorie : </label><input type="text"   value={categorie}  onChange={(event)=> setCategorie(event.target.value)}/></span>
  <span className='font-bold'><label >Owner : </label><input type="text" value={owner} onChange={(event)=> setOwner(event.target.value)}/></span>
  
 
  <button type="submit" className='modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'>Add</button>
  </form>
  </div>

  
</div>)
    
  
}
