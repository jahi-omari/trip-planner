import React from 'react'
import {Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'


const router = createBrowserRouter(
  [{path: "/", element: <Homepage/>}]
)

const App = () => {
  return <RouterProvider router={router}/>
}

export default App


