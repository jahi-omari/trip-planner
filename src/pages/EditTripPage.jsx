

import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaCalendarAlt, FaPlane, FaHotel, FaCar } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'

const EditTripPage = () => {
  const navigate = useNavigate()
  const _ctx = useContext(TripContext) || {}
  const { selectedTrip, setSelectedTrip, updateTrip, setFlightData, setCarRentalData, setActivityData, setLodgingData, flightData, carRentalData, activityData, lodgingData } = _ctx


  // Trip main fields
  const [tripName, setTripName] = useState('')
  const [tripLocation, setTripLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')

  // Flights (array) and total cost
  const [flights, setFlights] = useState([])
  const [flightTotalCost, setFlightTotalCost] = useState('')


  // Car rental (object)
  const [carRental, setCarRental] = useState(null)

  // Activities (array)
  const [activities, setActivities] = useState([])
  // Lodging (array)
  const [lodgings, setLodgings] = useState([])


  useEffect(() => {
    if (selectedTrip) {
      setTripName(selectedTrip.tripName || '')
      setTripLocation(selectedTrip.tripLocation || '')
      setStartDate(selectedTrip.startDate || '')
      setEndDate(selectedTrip.endDate || '')
      setDescription(selectedTrip.description || '')
      // Flights - check context first (for newly added items), then fall back to selectedTrip
      if (flightData?.flights?.length > 0) {
        setFlights(flightData.flights.map(f => ({ ...f })))
        setFlightTotalCost(flightData.totalCost || '')
      } else if (selectedTrip.flightData && Array.isArray(selectedTrip.flightData.flights)) {
        setFlights(selectedTrip.flightData.flights.map(f => ({ ...f })))
        setFlightTotalCost(selectedTrip.flightData.totalCost || '')
      } else {
        setFlights([])
        setFlightTotalCost('')
      }
      // Car rental - check context first
      if (carRentalData?.rentalAgency) {
        setCarRental({ ...carRentalData })
      } else if (selectedTrip.carRentalData && selectedTrip.carRentalData.rentalAgency) {
        setCarRental({ ...selectedTrip.carRentalData })
      } else {
        setCarRental(null)
      }
      // Activities - check context first
      if (activityData?.length > 0) {
        setActivities(activityData.map(a => ({ ...a })))
      } else if (selectedTrip.activityData && Array.isArray(selectedTrip.activityData)) {
        setActivities(selectedTrip.activityData.map(a => ({ ...a })))
      } else {
        setActivities([])
      }
      // Lodging - check context first
      if (lodgingData?.length > 0) {
        setLodgings(lodgingData.map(l => ({ ...l })))
      } else if (selectedTrip.lodgingData && Array.isArray(selectedTrip.lodgingData)) {
        setLodgings(selectedTrip.lodgingData.map(l => ({ ...l })))
      } else {
        setLodgings([])
      }
    }
  }, [selectedTrip, flightData, carRentalData, activityData, lodgingData])

  if (!selectedTrip) {
    return (
      <section className="bg-indigo-50 py-10">
        <div className="container m-auto px-6 max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <p className="text-gray-600">No trip selected. Please select a trip from the upcoming trips page.</p>
          </div>
        </div>
      </section>
    )
  }


  // --- Flights handlers ---
  const handleFlightChange = (id, field, value) => {
    setFlights(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
  }
  const handleAddFlight = () => {
    const nextId = flights.length > 0 ? Math.max(...flights.map(f => f.id)) + 1 : 1
    setFlights(prev => [...prev, { id: nextId, departure: '', airline: '', flightNumber: '', seats: '', customName: '' }])
  }
  const handleRemoveFlight = (id) => {
    setFlights(prev => prev.filter(f => f.id !== id))
  }

  // --- Car rental handlers ---
  const handleCarRentalChange = (e) => {
    const { name, value } = e.target
    setCarRental(prev => ({ ...prev, [name]: value }))
  }
  const handleCarRentalNestedChange = (section, field, value) => {
    setCarRental(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // --- Activities handlers ---
  const handleActivityChange = (id, field, value) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a))
  }
  const handleAddActivity = () => {
    const nextId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1
    setActivities(prev => [...prev, { id: nextId, activityName: '', startDate: '', startTime: '', endDate: '', endTime: '', venue: '', address: '', phone: '', website: '', email: '', totalCost: '' }])
  }
  const handleRemoveActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  // --- Lodging handlers ---
  const handleLodgingChange = (id, field, value) => {
    setLodgings(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }
  const handleAddLodging = () => {
    const nextId = lodgings.length > 0 ? Math.max(...lodgings.map(l => l.id)) + 1 : 1
    setLodgings(prev => [...prev, { id: nextId, lodgingName: '', startDate: '', startTime: '', endDate: '', endTime: '', venue: '', address: '', phone: '', website: '', email: '', confirmationNumber: '', totalCost: '' }])
  }
  const handleRemoveLodging = (id) => {
    setLodgings(prev => prev.filter(l => l.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedTrip) return
    const updatedTrip = {
      ...selectedTrip,
      tripName,
      tripLocation,
      startDate,
      endDate,
      description,
      flightData: flights.length > 0 ? { flights, totalCost: flightTotalCost } : undefined,
      carRentalData: carRental && carRental.rentalAgency ? carRental : undefined,
      activityData: activities.length > 0 ? activities : undefined,
      lodgingData: lodgings.length > 0 ? lodgings : undefined
    }
    updateTrip(updatedTrip)
    setSelectedTrip(updatedTrip)
    navigate('/upcoming-trips-page/trip-details')
  }

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Edit Trip</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Trip Name</label>
              <input
                type="text"
                id="tripName"
                name="tripName"
                value={tripName}
                onChange={e => setTripName(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Family Holiday"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Trip Location</label>
              <input
                type="text"
                id="tripLocation"
                name="tripLocation"
                value={tripLocation}
                onChange={e => setTripLocation(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Hagerstown, Maryland"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add daily activities etc."
              ></textarea>
            </div>

            {/* --- Flights Section --- */}
            {flights.length > 0 && (
              <div className="mb-8 p-4 bg-indigo-100 rounded-md border border-indigo-300">
                <h3 className="text-lg font-semibold mb-3">Edit Flight Details</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                  <input
                    type="text"
                    value={flightTotalCost}
                    onChange={e => { const val = e.target.value; if (/^[0-9.]*$/.test(val)) setFlightTotalCost(val) }}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. 299.99"
                  />
                </div>
                {flights.map((flight, idx) => (
                  <div key={flight.id} className="mb-6 p-4 border rounded-md bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{flight.customName || `Flight ${flight.id}`}</h3>
                      </div>
                      {flights.length > 1 && (
                        <button type="button" onClick={() => handleRemoveFlight(flight.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Departure Date</label>
                        <input
                          type="date"
                          value={flight.departure}
                          onChange={e => handleFlightChange(flight.id, 'departure', e.target.value)}
                          className="border rounded w-full py-2 px-3"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Airline</label>
                        <input type="text" value={flight.airline} onChange={e => handleFlightChange(flight.id, 'airline', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Airline name" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Flight Number</label>
                        <input type="text" value={flight.flightNumber} onChange={e => handleFlightChange(flight.id, 'flightNumber', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="e.g. BA123" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Seats</label>
                        <input type="text" value={flight.seats} onChange={e => handleFlightChange(flight.id, 'seats', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Seats" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-3">
                  <button type="button" onClick={handleAddFlight} className="text-sm text-indigo-600 hover:underline">Add another flight</button>
                </div>
              </div>
            )}

            {/* --- Car Rental Section --- */}
            {carRental && (
              <div className="mb-8 p-4 bg-green-100 rounded-md border border-green-300">
                <h3 className="text-lg font-semibold mb-3">Edit Car Rental Details</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Rental Agency</label>
                  <input type="text" name="rentalAgency" value={carRental.rentalAgency} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" placeholder="Rental Agency" />
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Pickup Date</label>
                    <input type="date" name="pickupDate" value={carRental.pickupDate} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Pickup Time</label>
                    <input type="time" name="pickupTime" value={carRental.pickupTime} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" />
                  </div>
                </div>
                <div className="mb-6 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Dropoff Date</label>
                    <input type="date" name="dropoffDate" value={carRental.dropoffDate} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Dropoff Time</label>
                    <input type="time" name="dropoffTime" value={carRental.dropoffTime} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Website</label>
                  <input type="text" name="website" value={carRental.website} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" placeholder="Website" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input type="email" name="email" value={carRental.email} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" placeholder="Email" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Confirmation Number</label>
                  <input type="text" name="confirmationNumber" value={carRental.confirmationNumber} onChange={handleCarRentalChange} className="border rounded w-full py-2 px-3" placeholder="Confirmation number" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                  <input type="text" name="totalCost" value={carRental.totalCost} onChange={e => {
                    const val = e.target.value
                    if (/^[0-9.]*$/.test(val)) handleCarRentalChange(e)
                  }} className="border rounded w-full py-2 px-3" placeholder="Total Cost" />
                </div>
                {/* Pickup Location */}
                <h3 className="text-md font-semibold mt-8 mb-4">Pickup Location</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Pickup Location</label>
                  <input type="text" value={carRental.pickupLocation?.location || ''} onChange={e => handleCarRentalNestedChange('pickupLocation', 'location', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Pickup location" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Address</label>
                  <input type="text" value={carRental.pickupLocation?.address || ''} onChange={e => handleCarRentalNestedChange('pickupLocation', 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Phone</label>
                  <input type="text" value={carRental.pickupLocation?.phone || ''} onChange={e => handleCarRentalNestedChange('pickupLocation', 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
                </div>
                {/* Dropoff Location */}
                <h3 className="text-md font-semibold mt-8 mb-4">Dropoff Location</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Dropoff Location</label>
                  <input type="text" value={carRental.dropoffLocation?.location || ''} onChange={e => handleCarRentalNestedChange('dropoffLocation', 'location', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Dropoff location" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Address</label>
                  <input type="text" value={carRental.dropoffLocation?.address || ''} onChange={e => handleCarRentalNestedChange('dropoffLocation', 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Phone</label>
                  <input type="text" value={carRental.dropoffLocation?.phone || ''} onChange={e => handleCarRentalNestedChange('dropoffLocation', 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
                </div>
                {/* Rental Info */}
                <h3 className="text-md font-semibold mt-8 mb-4">Rental Information</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Car Type</label>
                  <input type="text" value={carRental.rentalInfo?.carType || ''} onChange={e => handleCarRentalNestedChange('rentalInfo', 'carType', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Car type" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Mileage Charges</label>
                  <input type="text" value={carRental.rentalInfo?.mileageCharges || ''} onChange={e => {
                    const val = e.target.value
                    if (/^[0-9.]*$/.test(val)) handleCarRentalNestedChange('rentalInfo', 'mileageCharges', val)
                  }} className="border rounded w-full py-2 px-3" placeholder="Mileage charges" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Car Details</label>
                  <input type="text" value={carRental.rentalInfo?.carDetails || ''} onChange={e => handleCarRentalNestedChange('rentalInfo', 'carDetails', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Car details" />
                </div>
              </div>
            )}

            {/* --- Activities Section --- */}
            {activities.length > 0 && (
              <div className="mb-8 p-4 bg-yellow-100 rounded-md border border-yellow-300">
                <h3 className="text-lg font-semibold mb-3">Edit Activity Details</h3>
                {activities.map((activity, idx) => (
                  <div key={activity.id} className="mb-6 p-4 border rounded-md bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{activity.activityName || `Activity ${activity.id}`}</h3>
                      </div>
                      {activities.length > 1 && (
                        <button type="button" onClick={() => handleRemoveActivity(activity.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Activity Name</label>
                        <input type="text" value={activity.activityName} onChange={e => handleActivityChange(activity.id, 'activityName', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Activity Name" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Venue</label>
                        <input type="text" value={activity.venue} onChange={e => handleActivityChange(activity.id, 'venue', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Venue" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                        <input type="date" value={activity.startDate} onChange={e => handleActivityChange(activity.id, 'startDate', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Start Time</label>
                        <input type="time" value={activity.startTime} onChange={e => handleActivityChange(activity.id, 'startTime', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">End Date</label>
                        <input type="date" value={activity.endDate} onChange={e => handleActivityChange(activity.id, 'endDate', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">End Time</label>
                        <input type="time" value={activity.endTime} onChange={e => handleActivityChange(activity.id, 'endTime', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Address</label>
                        <input type="text" value={activity.address} onChange={e => handleActivityChange(activity.id, 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Phone</label>
                        <input type="text" value={activity.phone} onChange={e => handleActivityChange(activity.id, 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Website</label>
                        <input type="text" value={activity.website} onChange={e => handleActivityChange(activity.id, 'website', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Website" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" value={activity.email} onChange={e => handleActivityChange(activity.id, 'email', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Email" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                        <input type="text" value={activity.totalCost} onChange={e => { const val = e.target.value; if (/^[0-9.]*$/.test(val)) handleActivityChange(activity.id, 'totalCost', val) }} className="border rounded w-full py-2 px-3" placeholder="Total Cost" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-3">
                  <button type="button" onClick={handleAddActivity} className="text-sm text-yellow-700 hover:underline">Add another activity</button>
                </div>
              </div>
            )}

            {/* --- Lodging Section --- */}
            {lodgings.length > 0 && (
              <div className="mb-8 p-4 bg-purple-100 rounded-md border border-purple-300">
                <h3 className="text-lg font-semibold mb-3">Edit Lodging Details</h3>
                {lodgings.map((lodging, idx) => (
                  <div key={lodging.id} className="mb-6 p-4 border rounded-md bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{lodging.lodgingName || `Lodging ${lodging.id}`}</h3>
                      </div>
                      {lodgings.length > 1 && (
                        <button type="button" onClick={() => handleRemoveLodging(lodging.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Lodging Name</label>
                        <input type="text" value={lodging.lodgingName} onChange={e => handleLodgingChange(lodging.id, 'lodgingName', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Lodging name" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Venue</label>
                        <input type="text" value={lodging.venue} onChange={e => handleLodgingChange(lodging.id, 'venue', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Venue" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                        <input type="date" value={lodging.startDate} onChange={e => handleLodgingChange(lodging.id, 'startDate', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Start Time</label>
                        <input type="time" value={lodging.startTime} onChange={e => handleLodgingChange(lodging.id, 'startTime', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">End Date</label>
                        <input type="date" value={lodging.endDate} onChange={e => handleLodgingChange(lodging.id, 'endDate', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">End Time</label>
                        <input type="time" value={lodging.endTime} onChange={e => handleLodgingChange(lodging.id, 'endTime', e.target.value)} className="border rounded w-full py-2 px-3" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Address</label>
                        <input type="text" value={lodging.address} onChange={e => handleLodgingChange(lodging.id, 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Phone</label>
                        <input type="text" value={lodging.phone} onChange={e => handleLodgingChange(lodging.id, 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Website</label>
                        <input type="text" value={lodging.website} onChange={e => handleLodgingChange(lodging.id, 'website', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Website" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" value={lodging.email} onChange={e => handleLodgingChange(lodging.id, 'email', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Email" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Confirmation Number</label>
                        <input type="text" value={lodging.confirmationNumber} onChange={e => handleLodgingChange(lodging.id, 'confirmationNumber', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Confirmation number" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                        <input type="text" value={lodging.totalCost} onChange={e => { const val = e.target.value; if (/^[0-9.]*$/.test(val)) handleLodgingChange(lodging.id, 'totalCost', val) }} className="border rounded w-full py-2 px-3" placeholder="Total Cost" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-3">
                  <button type="button" onClick={handleAddLodging} className="text-sm text-purple-700 hover:underline">Add another lodging</button>
                </div>
              </div>
            )}
            {!lodgings.length && (
              <div className="mb-6">
                <button type="button" onClick={handleAddLodging} className="text-sm text-purple-700 hover:underline">Add Lodging</button>
              </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  // Sync current state to context before navigating
                  if (activities.length > 0) setActivityData(activities)
                  navigate('/add-trip/add-activity')
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full"
              >
                <FaCalendarAlt /> Add Activity
              </button>
              <button
                type="button"
                onClick={() => {
                  // Sync current state to context before navigating
                  if (flights.length > 0) setFlightData({ flights, totalCost: flightTotalCost })
                  navigate('/add-trip/add-flight')
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full"
              >
                <FaPlane /> Add Flight
              </button>
              <button
                type="button"
                onClick={() => {
                  // Sync current state to context before navigating
                  if (lodgings.length > 0) setLodgingData(lodgings)
                  navigate('/add-trip/add-lodging')
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full"
              >
                <FaHotel /> Add Lodging
              </button>
              <button
                type="button"
                onClick={() => {
                  // Sync current state to context before navigating
                  if (carRental) setCarRentalData(carRental)
                  navigate('/add-trip/add-car')
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full"
              >
                <FaCar /> Add Car Rental
              </button>
            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditTripPage