import React from 'react'
import { FaMapMarker, FaGlobeAmericas} from 'react-icons/fa'

const RecentUpcomingTrips = () => {

    // Limit Trips to 3 on homepage
    // const recentUpcomingTrips = trips.slice(0,3) 

  return (
    <>
        {/* <!-- View Current Trips --> */}
    <section className="bg-indigo-50 px-4 py-10">
      <div className="max-w-4xl mx-auto px-4 m-auto">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
          Upcoming Trips
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {/* <!-- Trip 1 --> */}
          <div className="bg-white rounded-xl shadow-md relative border-3">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">November 3rd, 2025 - November 12th, 2025</div>
                <h3 className="text-xl font-bold">Mom's Birthday</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-red-500 mb-3">
                  <FaMapMarker className="inline text-lg mr-2 mb-1"/>
                  Castries, ST. LUCIA
                </div>
                <a
                  href="job.html"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 View Trip
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Trip 2 --> */}
          <div className="bg-white rounded-xl shadow-md relative border-3">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">November 25th, 2025 - December 1st, 2025</div>
                <h3 className="text-xl font-bold">Tottenham Game</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-orange-500 mb-3">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  London, ENGLAND
                </div>
                <a
                  href="job.html"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 View Trip
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Trip 3 --> */}
          <div className="bg-white rounded-xl shadow-md relative border-3">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">December 10th, 2025 - December 18th, 2025</div>
                <h3 className="text-xl font-bold">Staff Christmas Italy Trip</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-orange-500 mb-3">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  Venice, ITALY
                </div>
                <a
                  href="job.html"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 View Trip
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default RecentUpcomingTrips