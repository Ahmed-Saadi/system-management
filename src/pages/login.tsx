import React from 'react'

export const Login = () => {
  return (
    <div>
        <form className='bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen flex flex-col justify-center  items-center '>
            <img src='../public/images/login.jpeg' alt="hello" className='h-1/5 w-1/5  rounded-full m-3.5'/>
            <input type="text"  placeholder='Username' className=' rounded-2xl w-80 h-10 bg-cyan-100  m-4 p-2 font-semibold'/>
            <input type="password"   placeholder='Password' className=' rounded-2xl w-80 h-10 bg-cyan-100  m-2 p-4 font-semibold'/>
            <button className='p-4 m-4 rounded-3xl w-40 border-none text-gray-50 bg-indigo-500 ' type='submit'>Login</button>
        </form>
    </div>
  )
}
