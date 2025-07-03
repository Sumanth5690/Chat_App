import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import SettingPage from './components/SettingPage'
import ProfilePage from './components/ProfilePage'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser,checkAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
         <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/login' element={<LoginPage />}/>
           <Route path='/settings' element={<SettingPage />}/>
           <Route path='/profile' element={<ProfilePage />}/>
      </Routes>
    </div>
  )
}

export default App