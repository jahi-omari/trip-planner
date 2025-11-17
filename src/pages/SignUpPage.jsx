import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <>
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0"
        >
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Name</label
              >
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. John Smith"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Hagerstown, Maryland"
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
                placeholder="Enter your password"
                required
              />
            </div>

             <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Re-Enter Your Password</label
              >
              <input
                type="password"
                id="re-enter-password"
                name="re-enter-password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <Link to="/LoginPage">Save</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default SignUpPage