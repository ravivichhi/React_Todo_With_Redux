// import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../appwrite/auth'
import { logout } from '../features/AuthSlice'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()


  const navItems = [
    {
        name: "LOGIN",
        slug: "login",
        active: !authStatus,
    },
    {
        name: "SIGNUP",
        slug: "signup",
        active: !authStatus,
    },
  ]
    const dispatch = useDispatch();
    const logoutHandler = () => {
        service.logout().then(()=>{dispatch(logout())});
    }


  return (
    <header className='py-3 shadow bg-gray-400'>
        <nav className='flex'>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 text-sm font-bold leading-tight hover:bg-blue-400 bg-blue-100 m-2 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authData && (
              <li>
                <select
                  className='inline-bock px-6 py-2 text-sm font-bold leading-tight duration-200 hover:bg-blue-400 bg-blue-100 m-2'
                >
                  <option value="">{authData.name}</option>
                  <option value="">{authData.email}</option>
                </select>
                  
              </li>
            )}
            {authStatus && (
              <li>
                 <button
                    className='inline-bock px-6 py-2 text-sm font-bold leading-tight duration-200 hover:bg-blue-400 bg-blue-100 m-2 rounded-full'
                    onClick={logoutHandler}
                    >Logout</button>
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header