import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AddTrip from '../components/AddTrip'
import RecentUpcomingTrips from '../components/RecentUpcomingTrips'
import ViewAllTrips from '../components/ViewAllTrips'


const Homepage = () => {
  return (
    <>
        <Hero title="Plan Your Next Trip" subtitle="Keep track of all your past, current and upcoming trips!"/>
        <AddTrip/>
        <RecentUpcomingTrips/>
        <ViewAllTrips/>
    </>
  )
}

export default Homepage