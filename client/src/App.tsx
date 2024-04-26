
import { Route, Routes,Link } from 'react-router-dom'
import './App.css'
import { Dashbord } from './pages/dashbord'
import { Materiel } from './pages/materiel'
import { Login } from './pages/login'
import { Accounts } from './pages/accounts.tsx'
import { Notfound } from './pages/notfound.tsx'
import { Profile } from './pages/profile.tsx'
import { useState } from 'react'


function App() {
  const [status,setstatus] = useState<boolean>(true);

  const logout =() => {
    setstatus(false)
  }

   
    return (
      status ?  <><div className='flex'>
      <div className='flex  bg-slate-700 text-white flex-col  w-56 h-screen '>
         <div className='flex flex-row justify-center text-4xl items-center'>
            <img src='../public/images/system.png' alt="icon logo" className='h-20 w-20' />
            <h3>PFE</h3>
         </div>
         <div className='flex flex-col'>
          <div className='flex   items-center  text-2xl p-4' ><img src='../public/icons/dashboard_icon.png' alt="dash icon " /><Link to='/dashboard'> Dashboard</Link></div>
          <div className='flex   items-center  text-2xl p-4' ><img src="../public/icons/materiel.png" alt="" /><Link to='/Materiel'>Materiel</Link></div>
          <div className='flex   items-center  text-2xl p-4' ><img src="../public/icons/accounts.png" alt="" /><Link to='/accounts'>Accounts</Link></div>
          <div className='flex   items-center  text-2xl p-4' ><img src="../public/icons/profile.png" alt="" /><Link to='/profile'>Profile</Link></div>
          <div className='flex   items-center  text-2xl p-4' ><img src="../public/icons/logout.png" alt="" /><Link to='' onClick={logout}>Log out</Link></div>

         </div>
      
      </div>
      
      <Routes>
        <Route path='/' element={<Dashbord />}/> 
        <Route path='/dashboard' element={<Dashbord />}/>
        <Route path='/materiel' element={<Materiel />}/>
        <Route path='/accounts' element={<Accounts />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      
  </div></> : <Login />)
}
      
       
     
  

export default App
