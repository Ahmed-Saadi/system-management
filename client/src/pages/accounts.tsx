import React, { useEffect, useState } from 'react'
import { Account } from '../models/model';
import axios from 'axios';






export const Accounts = () => {
  
  const [accounts,setAccounts] = useState<Account[]>([]);
  const [rowAccount,setRowAccount] = useState<Account|null>(null);

  useEffect(() => {
      axios.get('http://localhost:8081/api/user/get').then(response => 
        setAccounts([...response.data])
      )
  },[])
  const handleclick = (item:Account) => {
      setRowAccount({...item})
  }
  
  const handleCloseClick = ()=> {
    setRowAccount(null)
  }

  return (
    <div className='flex flex-col  items-center justify-center'>
      <h1 className=' font-bold text-3xl border-black border-4 p-4'>List of Accounts</h1>
      <div className='flex flex-col border-4 m-2 p-2 '>
        <table>
          <thead>
            <tr className='p-2 font-bold text-2xl '>
              <th className='w-52 h-4 text-center border-2'>Name</th>
              <th className='w-52 h-4 text-center border-2'>Familly Name</th>
              <th className='w-52 h-4 text-center border-2'>Email</th>
              <th className='w-52 h-4 text-center border-2'>Date Of Birth</th>
              <th className='w-52 h-4 text-center border-2'>Phone Number</th>
              <th className='w-52 h-4 text-center border-2'>Profession</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((item,index) =>(
            <tr key={index} onClick={() => handleclick(item)} className='cursor-pointer text-center'>
              <td  className='w-52 h-4  border-2'>{item.username}</td>
              <td  className='w-52 h-4  border-2'>{item.user_family_name}</td>
              <td  className='w-52 h-4  border-2'>{item.email}</td>
              <td  className='w-52 h-4  border-2'>{item.phone_number}</td>
              <td  className='w-52 h-4  border-2'>{item.profession}</td>
              <td  className='w-52 h-4  border-2'>{item.dob}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
            { /* show a row of data */}

            {rowAccount && (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75  " >
                  <div className="bg-white p-14 rounded-lg flex flex-col h-[500px] w-[500px]">
                  <div className="flex justify-end">
                  <span className="cursor-pointer p-4 "  onClick={handleCloseClick}>
                    &times;
                  </span>
                </div>
                <p>Name :  {rowAccount.username}</p>
                <p>Familly Name : {rowAccount.user_family_name}</p>
                <p>Email : {rowAccount.email}</p>
                <p>Phone Number : {rowAccount.phone_number}</p>
                <p>Date of Birth : {rowAccount.dob}</p>
                <p>Profession : {rowAccount.profession}</p>
              </div>
              </div>
  )})

            


    </div>
  )
}
