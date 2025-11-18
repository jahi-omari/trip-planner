import React, { createContext, useState } from 'react'

export const TripContext = createContext()

export const TripProvider = ({ children }) => {
  const [flightData, setFlightData] = useState({
    flights: [],
    totalCost: ''
  })

  return (
    <TripContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </TripContext.Provider>
  )
}
