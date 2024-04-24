import React, { useState } from 'react'
import './styles.css'

export const Register = () => {
 
  
  return (
    <div className='container'>
      <form className='form-register container-form ' >
        <h2 id="h2-from-register">SIGN UP</h2>
        <div className='input-container'> 
          <label  htmlFor="">Name : </label>
          <input className='input-form-register' type="text" />
        </div>
        <div className='input-container'>
          <label htmlFor="">username :</label>
          <input className='input-form-register' type="text"/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Email :</label>
          <input className='input-form-register' type="email"/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Date Of Birth :</label>
          <input className='input-form-register' type="date"/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Passord :</label>
          <input className='input-form-register' type="password"/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Confirm Password :</label>
          <input className='input-form-register' type="password"/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Phone Number :</label>
          <input className='input-form-register'  type="text"/>
        </div>
        <button id='btn-form-submit' type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
