import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

const LoginPage = () => {
  return (
    <>
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-xl">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0"
        >
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. name@domain.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Password</label
              >
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                // placeholder="eg. Hagerstown, Maryland"
                required
              />
            </div>

            <div className='mb-4'>

            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 mt-5 mb-4 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <Link to="/signup">
                  Sign Up
                </Link>
              </button>
            </div>

            <div className='flex flex-row mb-4 mt-4'>
                <div className='flex-grow border-t border-gray-400 mt-3 mr-3'></div>
                <p className='text-black'>or sign in with:</p>
                <div className='flex-grow border-t border-gray-400 mt-3 ml-3'></div>    
            </div>
            
           <div>
              <button
                className="bg-green-400 hover:bg-indigo-600 text-black font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <FaGoogle className="inline text-lg mr-2 mb-1" /> Google
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default LoginPage