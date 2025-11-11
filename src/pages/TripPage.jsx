import React from 'react'
import { Link } from 'react-router-dom'

const TripPage = () => {
  return (
    <>
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/upcoming-trips-page"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
        </Link>
      </div>
    </section>

    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">Start Date - End Date</div>
              <h1 className="text-3xl font-bold mb-4">
                Trip Name
              </h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                ></i>
                <p className="text-orange-700">Location</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Trip Itinerary / Details
              </h3>

              <p className="mb-4">
                Textbox details that the user types in. Still need to add word processor tools in final build.
                <p>E.g. Monday [Date]: Details</p>
                <p>E.g. Tuesday [Date]: Details</p>
              </p>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside>
            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Trip</h3>
              <a
                href="/add-job.html"
                className="bg-indigo-900 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Trip</a
              >
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Trip
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  )
}

export default TripPage