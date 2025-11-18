import React, { createContext, useState } from 'react'

export const TripContext = createContext()

export const TripProvider = ({ children }) => {
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

  return (
    <TripContext.Provider value={{ flightData, setFlightData, carRentalData, setCarRentalData }}>
      {children}
    </TripContext.Provider>
  )
}
