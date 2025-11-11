import React from 'react'
import {Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage'
import UpcomingTripsPage from './pages/UpcomingTripsPage'
import MainLayout from './layouts/MainLayout'


const router = createBrowserRouter(
  [{path: "/", 
    element: <MainLayout/>,
    children: [
      {index: true, element: <Homepage/>},
      {path: "homepage", element: <Homepage/>},
      {path: "upcoming-trips-page", element: <UpcomingTripsPage/>},
    ]
  }]
)

const App = () => {
  return <RouterProvider router={router}/>
}

export default App


