import React from 'react'
import Navbar from './components/navbar'
import Hero from './components/Hero'
import HomeCards from './components/HomeCards'
import UpcomingTrips from './components/UpcomingTrips'

const App = () => {
  return (
    <>
    <Navbar/>
    <Hero title="Plan Your Next Trip" subtitle="Keep track of all your past, current and upcoming trips!"/>
    <HomeCards/>
    <UpcomingTrips/>

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