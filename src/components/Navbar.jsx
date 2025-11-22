import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false)
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
                    isActive ? 'text-black bg-white font-black uppercase px-4 py-2 border-4 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all' 
                  : 'text-white font-black uppercase px-4 py-2 hover:bg-white hover:text-black hover:border-4 hover:border-black hover:rounded hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
  
  const mobileLinkClass = ({isActive}) =>
                    isActive ? 'block text-black bg-white font-black uppercase px-4 py-3 border-4 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mb-3' 
                  : 'block text-white font-black uppercase px-4 py-3 rounded hover:bg-white hover:text-black hover:border-4 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mb-3'

  return (
    <nav className="bg-indigo-900 border-b-4 border-black relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-between md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center" to="/homepage">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="SmartTrip Planner"
              />
              <span className="hidden md:block text-white text-2xl font-black ml-2 uppercase"
                >SmartTrip Planner</span
              >
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-auto items-center">
              <div className="flex gap-3">
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

              {/* Profile Button with Dropdown - Desktop */}
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

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              {/* Profile Button - Mobile */}
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-10 h-10 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <FaUser className="text-indigo-900 text-base" />
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-10 h-10 bg-white border-4 border-black rounded flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {showMobileMenu ? (
                  <FaTimes className="text-indigo-900 text-xl" />
                ) : (
                  <FaBars className="text-indigo-900 text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-indigo-900 border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-40 p-4"
        >
          <div className="flex flex-col">
            <NavLink
              to="/homepage"
              className={mobileLinkClass}
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/upcoming-trips-page"
              className={mobileLinkClass}
              onClick={() => setShowMobileMenu(false)}
            >
              Upcoming Trips
            </NavLink>
            <NavLink
              to="/past-trips"
              className={mobileLinkClass}
              onClick={() => setShowMobileMenu(false)}
            >
              Past Trips
            </NavLink>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {showProfileDropdown && (
        <div className="md:hidden absolute top-full right-2 mt-2 w-64 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
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
    </nav>
  )
}

export default Navbar