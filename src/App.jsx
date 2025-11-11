import React from 'react'
import {Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage'
import AddTrip from './pages/UpcomingTripsPage'
import MainLayout from './layouts/MainLayout'


const router = createBrowserRouter(
  [{path: "/", 
    element: <MainLayout/>,
    children: [
      {index: true, element: <Homepage/>}
    ]
  }]
)

const App = () => {
  return <RouterProvider router={router}/>
}

export default App


