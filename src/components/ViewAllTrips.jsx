import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TripContext } from '../context/TripContext'

const ViewAllTrips = () => {
  const _ctx = useContext(TripContext) || {}
  const { upcomingTrips } = _ctx

  // Only render if there are trips
  if (!upcomingTrips || upcomingTrips.length === 0) {
    return null
  }

  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/upcoming-trips-page"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Upcoming Trips
      </Link>
    </section>
  )
}

export default ViewAllTrips