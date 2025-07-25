import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingPage from './Pages/SettingPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  const {theme}=useThemeStore()

  console.log({onlineUsers})
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)
  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'></Loader>
    </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path='/' element={authUser ?<HomePage />:<Navigate to="/login"/>}/>
         <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/login' element={!authUser?<LoginPage />:<Navigate to="/"/>}/>
           <Route path='/settings' element={authUser ?<SettingPage />:<Navigate to="/login"/>}/>
           <Route path='/profile' element={authUser ?<ProfilePage />:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App