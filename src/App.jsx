import React from 'react'
import Navbar from './components/navbar'
import Hero from './components/Hero'

const App = () => {
  return (
    <>
    {/* <!-- Navbar --> */}
    <Navbar/>

    {/* <!-- Hero --> */}
    <Hero/>

    {/* <!-- Developers and Employers --> */}
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Explore</h2>
            <p className="mt-2 mb-4">
              Add trip details such as location, date, itinerary, etc.
            </p>
            <a
              href="/jobs.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add Trip
            </a>
          </div>
          {/* <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 mb-4">
              List your job to find the perfect developer for the role
            </p>
            <a
              href="/add-job.html"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Job
            </a>
          </div> */}
        </div>
      </div>
    </section>

    {/* <!-- Browse Jobs --> */}
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Current Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <!-- Job Listing 1 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">November 3rd, 2025</div>
                <h3 className="text-xl font-bold">Paris, France</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                {/* <div className="text-orange-700 mb-3">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  Boston, MA
                </div> */}
                <a
                  href="job.html"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 View Trip
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Job Listing 2 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">November 25th</div>
                <h3 className="text-xl font-bold">London, England</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                {/* <div className="text-orange-700 mb-3">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  Boston, MA
                </div> */}
                <a
                  href="job.html"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 View Trip
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Job Listing 3 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">December 10th, 2025</div>
                <h3 className="text-xl font-bold">Venice, Italy</h3>
              </div>

              <div className="mb-5">
               Itinerary Details
              </div>

              {/* <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3> */}

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                {/* <div className="text-orange-700 mb-3">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  Boston, MA
                </div> */}
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

    <section className="m-auto max-w-lg my-10 px-6">
      <a
        href="jobs.html"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Trips</a
      >
    </section>
    </>
  )
}

export default App

// const trips ={
//   1: { id: 1, destination: 'Paris', date: '2025-12-22', itinerary: 'Visit Eiffel Tower, Louvre Museum' },
//   2: { id: 2, destination: 'New York', date: '2026-01-15' },
// }
// // Created by typing 'rafce' (react arrow function export component)
// const App = () => {
//   // Only returns a single tag
//   return (
//     <>
//       <div classNameName="text-3xl font-bold underline">Trip Planner</div>
//       <button>Add Trip</button>
//       <ul>
//         <li style={{color:'red', fontSize:'24px'}}>{trips[1].destination}</li>
//       </ul>
//     </>
//   )
// }

// export default App