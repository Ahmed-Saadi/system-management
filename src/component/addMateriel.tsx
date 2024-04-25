import React, { useState } from 'react'
import {Row} from './model'



interface props{
  addMaterial: (data: Row) => void;

}

export const AddMateriel:React.FC<props> = ({addMaterial}) => {
    const [username,setUsername]=useState<string>('')
    const [age,setAge]=useState<number>(0)
    const [role,setRole]=useState<string>('')
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const material:Row = {name:username,age,role}
          addMaterial(material)
    }

    return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 flex-col">
  <div className=' bg-white m-20 p-14'>
  <div className='p-8 font-bold text-3xl'><h1>Add new materiel</h1></div>
  <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)} >
  <span className='font-bold'><label>usename : </label><input type="text"  value={username} onChange={(event)=> setUsername(event.target.value)}/></span>
  <span className='font-bold'><label>age : </label><input type="number" min={0}  value={age}  onChange={(event)=> setAge(Number(event.target.value))}/></span>
  <span className='font-bold'><label >role : </label><input type="text" value={role} onChange={(event)=> setRole(event.target.value)}/></span>
  <button type="submit" className='modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'>Add</button>
  </form>
  </div>

  
</div>)
    
  
}
