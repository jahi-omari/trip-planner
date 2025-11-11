import React from 'react'
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
            <a className="flex flex-shrink-0 items-center mr-4" href="/index.html">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="SmartTrip Planner"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >SmartTrip Planner</span
              >
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <a
                  href="/index.html"
                  className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Home</a
                >
                <a
                  href="/upcoming-trips.html"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  > Upcoming Trips</a
                >
                <a
                  href="/past-trips.html"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Past Trips</a
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