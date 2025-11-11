import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const navbar = () => {
  
  // Adds black background to button when a navbar button is selected 
  const linkClass = ({isActive}) => 
                    isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
                  : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  
  return (
    <nav className="bg-indigo-900 border-black-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="SmartTrip Planner"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >SmartTrip Planner</span
              >
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkClass}
                  >Home
                  </NavLink>
                <NavLink
                  to="/upcoming-trips-page"
                  className={linkClass}
                  > Upcoming Trips
                </NavLink>
                <NavLink
                  to="/past-trips"
                  className={linkClass}
                  >Past Trips
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default navbar