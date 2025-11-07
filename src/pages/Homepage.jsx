import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import UpcomingTrips from '../components/UpcomingTrips'
import ViewAllTrips from '../components/ViewAllTrips'


const Homepage = () => {
  return (
    <>
        <Hero title="Plan Your Next Trip" subtitle="Keep track of all your past, current and upcoming trips!"/>
        <HomeCards/>
        <UpcomingTrips/>
        <ViewAllTrips/>
    </>
  )
}

export default Homepage