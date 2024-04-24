import React from 'react'
import './styles.css'
import logo from '../assets/login.jpeg'
export const Login = () => {
  return (
    <div className='container'>
        <form className='container-form form-login'>
            <img src={logo}  alt="hello" />
            <input type="text" className="input-form" placeholder='Username'/>
            <input type="password"  className='input-form' placeholder='Password'/>
            <button>Login</button>
        </form>
    </div>
  )
}
