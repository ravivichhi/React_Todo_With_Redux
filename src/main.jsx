import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/TodoStore.js'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './componants/AuthLayout.jsx'
import Login from './componants/Login.jsx'
import Signup from './componants/Signup.jsx'
import Todo from './pages/Todo.jsx'
import Notfound from './componants/Notfound.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
          path: "*",
          element: (
              <Notfound />
          ),
      },
      {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
          ),
      },
      {
        path: "/dashboard",
        element: (
            <AuthLayout authentication={true}>
                <Todo />
            </AuthLayout>
        ),
    },
  ],
},
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>
)
