import React from 'react'


export const Materiel = () => {
  return (
    <div className='flex flex-col items-center flex-grow '>
      <div className=' font-bold text-3xl' ><h1>List de Materiel</h1></div>
      <div className='flex border-4 flex-grow'>
        <div className=''>tous le materiel</div>
        <div className=' '>matriel occuper</div>
        <div className=''>materiel dispo</div>
      </div>
    </div>
  )
}
