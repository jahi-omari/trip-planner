// Lodging data (array of lodgings) will be defined inside TripProvider

import React, { createContext, useState, useEffect } from 'react'
import { getAllTrips, createTrip as createTripAPI, updateTrip as updateTripAPI, deleteTrip as deleteTripAPI } from '../utils/api'


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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load trips from backend when component mounts
  useEffect(() => {
    const loadTrips = async () => {
      const token = localStorage.getItem('token')
      if (!token) return // Skip if not authenticated
      
      setLoading(true)
      setError(null)
      try {
        const trips = await getAllTrips()
        setUpcomingTrips(trips)
      } catch (err) {
        console.error('Failed to load trips:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const addTrip = async (tripData) => {
    setLoading(true)
    setError(null)
    try {
      // Call backend API to create trip
      const newTrip = await createTripAPI(tripData)
      
      // Update local state with the trip returned from backend
      setUpcomingTrips(prev => [newTrip, ...prev])
      return newTrip
    } catch (err) {
      console.error('Failed to create trip:', err)
      setError(err.message)
      
      // Fallback to local state if backend fails
      const localTrip = {
        id: Date.now(),
        ...tripData,
        createdAt: new Date().toISOString()
      }
      setUpcomingTrips(prev => [localTrip, ...prev])
      return localTrip
    } finally {
      setLoading(false)
    }
  }

  // Update an existing trip by id
  const updateTrip = async (updatedTrip) => {
    if (!updatedTrip || !updatedTrip.id) return
    
    setLoading(true)
    setError(null)
    try {
      // Call backend API to update trip
      const updated = await updateTripAPI(updatedTrip.id, updatedTrip)
      
      // Update local state with the trip returned from backend
      setUpcomingTrips(prev => prev.map(t => t.id === updated.id ? updated : t))
      return updated
    } catch (err) {
      console.error('Failed to update trip:', err)
      setError(err.message)
      
      // Fallback to local state update if backend fails
      setUpcomingTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t))
      return updatedTrip
    } finally {
      setLoading(false)
    }
  }

  // Delete a trip by id
  const deleteTrip = async (tripId) => {
    setLoading(true)
    setError(null)
    try {
      // Call backend API to delete trip
      await deleteTripAPI(tripId)
      
      // Update local state to remove the trip
      setUpcomingTrips(prev => prev.filter(t => t.id !== tripId))
      return true
    } catch (err) {
      console.error('Failed to delete trip:', err)
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
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
      deleteTrip,
      clearFlightData,
      clearCarRentalData,
      selectedTrip,
      setSelectedTrip,
      loading,
      error
    }}>
      {children}
    </TripContext.Provider>
  )
}
