import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const navbar = () => {
  return (
    <nav className="bg-indigo-900 border-black-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="SmartTrip Planner"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >SmartTrip Planner</span
              >
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Home</Link
                >
                <Link
                  to="/upcoming-trips-page"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  > Upcoming Trips</Link
                >
                <Link
                  to="/past-trips"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Past Trips</Link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default navbar