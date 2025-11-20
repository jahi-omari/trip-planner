import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Placeholder user data (will be replaced with real auth data later)
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // TODO: Add actual logout logic with backend call
    console.log('Logging out')
    navigate('/')
  }
  
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
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/homepage">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="SmartTrip Planner"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >SmartTrip Planner</span
              >
            </NavLink>
            <div className="md:ml-auto flex items-center">
              <div className="flex space-x-2">
                <NavLink
                  to="/homepage"
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

              {/* Profile Button with Dropdown */}
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <FaUser className="text-indigo-900 text-xl" />
                </button>

                {/* Dropdown Card */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
                    <div className="p-4 border-b-4 border-black">
                      <p className="font-black text-lg uppercase">{user.firstName} {user.lastName}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false)
                          navigate('/profile')
                        }}
                        className="w-full text-left px-4 py-3 font-bold hover:bg-gray-100 border-2 border-transparent hover:border-black rounded transition-all flex items-center gap-2"
                      >
                        <FaUser /> View Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false)
                          handleLogout()
                        }}
                        className="w-full text-left px-4 py-3 font-bold hover:bg-red-50 border-2 border-transparent hover:border-red-600 rounded transition-all flex items-center gap-2 text-red-600"
                      >
                        <FaSignOutAlt /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar