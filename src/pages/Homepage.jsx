import React, { useContext } from 'react'
import Hero from '../components/Hero'
import AddTrip from '../components/AddTrip'
import RecentUpcomingTrips from '../components/RecentUpcomingTrips'
import ViewAllTrips from '../components/ViewAllTrips'
import { TripContext } from '../context/TripContext'

const Homepage = () => {
  const _ctx = useContext(TripContext) || {}
  const { upcomingTrips } = _ctx
  const hasTrips = upcomingTrips && upcomingTrips.length > 0

  return (
    <>
      {/* Main viewport section with Hero and AddTrip - always fits in viewport */}
      <div className="h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
        <div className="flex-shrink-0 flex-grow">
          <Hero title="Plan Your Next Trip" subtitle="Keep track of all your past, current and upcoming trips!"/>
          <AddTrip/>
        </div>
        
        {/* Scroll hint - only show if there are trips */}
        {hasTrips && (
          <div className="text-center pb-6 mt-auto flex-shrink-0">
            <div className="inline-block animate-bounce">
              <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <p className="text-sm font-bold text-gray-600 mt-2">UPCOMING TRIPS</p>
          </div>
        )}
      </div>
      
      {/* Trips section - only rendered if there are trips */}
      <RecentUpcomingTrips/>
      <ViewAllTrips/>
    </>
  )
}

export default Homepage