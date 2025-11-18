// Lodging data (array of lodgings) will be defined inside TripProvider

import React, { createContext, useState } from 'react'


export const TripContext = createContext()


export const TripProvider = ({ children }) => {
  const [lodgingData, setLodgingData] = useState([])
  const [flightData, setFlightData] = useState({
    flights: [],
    totalCost: ''
  })

  const [carRentalData, setCarRentalData] = useState({
    rentalAgency: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    website: '',
    email: '',
    confirmationNumber: '',
    totalCost: '',
    pickupLocation: {
      location: '',
      address: '',
      phone: ''
    },
    dropoffLocation: {
      location: '',
      address: '',
      phone: ''
    },
    rentalInfo: {
      carType: '',
      mileageCharges: '',
      carDetails: ''
    }
  })

  // Activity data (array of activities)
  const [activityData, setActivityData] = useState([])

  const [upcomingTrips, setUpcomingTrips] = useState([])

  const [selectedTrip, setSelectedTrip] = useState(null)


  const addTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      ...tripData,
      createdAt: new Date().toISOString()
    }
    setUpcomingTrips(prev => [newTrip, ...prev])
  }

  // Update an existing trip by id
  const updateTrip = (updatedTrip) => {
    if (!updatedTrip || !updatedTrip.id) return
    setUpcomingTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t))
  }

  const clearFlightData = () => {
    setFlightData({
      flights: [],
      totalCost: ''
    })
  }

  const clearCarRentalData = () => {
    setCarRentalData({
      rentalAgency: '',
      pickupDate: '',
      pickupTime: '',
      dropoffDate: '',
      dropoffTime: '',
      website: '',
      email: '',
      confirmationNumber: '',
      totalCost: '',
      pickupLocation: {
        location: '',
        address: '',
        phone: ''
      },
      dropoffLocation: {
        location: '',
        address: '',
        phone: ''
      },
      rentalInfo: {
        carType: '',
        mileageCharges: '',
        carDetails: ''
      }
    })
  }

  return (
    <TripContext.Provider value={{
      flightData,
      setFlightData,
      carRentalData,
      setCarRentalData,
      activityData,
      setActivityData,
      lodgingData,
      setLodgingData,
      upcomingTrips,
      addTrip,
      updateTrip,
      clearFlightData,
      clearCarRentalData,
      selectedTrip,
      setSelectedTrip
    }}>
      {children}
    </TripContext.Provider>
  )
}
