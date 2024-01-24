import { useEffect, useState } from 'react'
import './App.css'
import Header from './componants/Header'
import { useDispatch, useSelector } from 'react-redux'
import service from './appwrite/auth'
import {login,logout} from './features/AuthSlice'
import { Outlet } from 'react-router-dom'

  

function App() {
  const authStatus = useSelector((state) => state.auth.status)
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    service.getAccount()
          .then((userData) => {
            if(userData){
              dispatch(login({userData}))
            }else{
              dispatch(logout())
            }
          })
          .finally(()=> setLoader(false));
  },[authStatus])
  

  return !loader ? (
    <div className="bg-[#172842] min-h-screen py-0">
          <div className="mb-4 w-full">
              <Header /> 
          </div>
          <div className="mb-4">
            <Outlet />
          </div>
  </div>
  ) : null
}

export default App
