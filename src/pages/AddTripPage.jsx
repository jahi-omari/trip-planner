import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaPlane, FaHotel, FaCar } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'

const AddTripPage = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tripName, setTripName] = useState('')
  const [tripLocation, setTripLocation] = useState('')
  const [description, setDescription] = useState('')
  const _ctx = useContext(TripContext) || {}
  const { flightData, carRentalData, activityData, lodgingData, addTrip, clearFlightData, clearCarRentalData, setActivityData, setLodgingData } = _ctx

  // Convert mm/dd/yyyy to yyyy-mm-dd
  const formatDateToInput = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length !== 3) return ''
    const [month, day, year] = parts
    return `${year}-${month}-${day}`
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create trip object with all data

    const tripData = {
      tripName,
      tripLocation,
      startDate,
      endDate,
      description,
      flightData,
      carRentalData,
      activityData,
      lodgingData
    }

    // Save trip to context
    addTrip(tripData)


    // Clear flight, car rental, activity, and lodging data
    clearFlightData()
    clearCarRentalData()
    setActivityData([])
    setLodgingData([])

    // Reset form
    setTripName('')
    setTripLocation('')
    setStartDate('')
    setEndDate('')
    setDescription('')

    // Redirect to upcoming trips page
    navigate('/upcoming-trips-page')
  }
  return (
    <>
      <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Trip</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Trip Name</label
              >
              <input
                type="text"
                id="tripName"
                name="tripName"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Family Holiday"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Trip Location</label
              >
              <input
                type="text"
                id="title"
                name="title"
                value={tripLocation}
                onChange={(e) => setTripLocation(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Hagerstown, Maryland"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Start Date</label
              >
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                onBlur={(e) => {
                  const textValue = e.target.value
                  if (textValue && !textValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    const dateValue = formatDateToInput(textValue)
                    if (dateValue) setStartDate(dateValue)
                  }
                }}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="mm/dd/yyyy"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >End Date</label
              >
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                onBlur={(e) => {
                  const textValue = e.target.value
                  if (textValue && !textValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    const dateValue = formatDateToInput(textValue)
                    if (dateValue) setEndDate(dateValue)
                  }
                }}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="mm/dd/yyyy"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add daily activities etc."
              ></textarea>
            </div>

            {/* Display Flights if they exist */}
            {flightData.flights.length > 0 && (
              <div className="mb-6 p-4 bg-indigo-100 rounded-md border border-indigo-300">
                <h3 className="text-lg font-semibold mb-3">Flight Details</h3>
                {flightData.flights.map((flight) => (
                  <div key={flight.id} className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold">{flight.customName || `Flight ${flight.id}`}</p>
                    <p className="text-sm text-gray-700">Departure: {flight.departure}</p>
                    <p className="text-sm text-gray-700">Airline: {flight.airline}</p>
                    <p className="text-sm text-gray-700">Flight Number: {flight.flightNumber}</p>
                    <p className="text-sm text-gray-700">Seats: {flight.seats}</p>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <p className="font-semibold">Total Cost: ${flightData.totalCost || '0.00'}</p>
                </div>
              </div>
            )}

            {/* Display Car Rental if it exists */}
            {carRentalData.rentalAgency && (
              <div className="mb-6 p-4 bg-green-100 rounded-md border border-green-300">
                <h3 className="text-lg font-semibold mb-3">Car Rental Details</h3>
                
                <div className="mb-3 p-3 bg-white rounded border">
                  <p className="font-semibold text-base mb-2">Rental Information</p>
                  <p className="text-sm text-gray-700">Agency: {carRentalData.rentalAgency}</p>
                  <p className="text-sm text-gray-700">Pickup: {carRentalData.pickupDate} at {carRentalData.pickupTime}</p>
                  <p className="text-sm text-gray-700">Dropoff: {carRentalData.dropoffDate} at {carRentalData.dropoffTime}</p>
                  <p className="text-sm text-gray-700">Confirmation: {carRentalData.confirmationNumber}</p>
                  {carRentalData.website && <p className="text-sm text-gray-700">Website: {carRentalData.website}</p>}
                  {carRentalData.email && <p className="text-sm text-gray-700">Email: {carRentalData.email}</p>}
                </div>

                {(carRentalData.pickupLocation.location || carRentalData.pickupLocation.address) && (
                  <div className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold text-sm mb-2">Pickup Location</p>
                    {carRentalData.pickupLocation.location && <p className="text-sm text-gray-700">Location: {carRentalData.pickupLocation.location}</p>}
                    {carRentalData.pickupLocation.address && <p className="text-sm text-gray-700">Address: {carRentalData.pickupLocation.address}</p>}
                    {carRentalData.pickupLocation.phone && <p className="text-sm text-gray-700">Phone: {carRentalData.pickupLocation.phone}</p>}
                  </div>
                )}

                {(carRentalData.dropoffLocation.location || carRentalData.dropoffLocation.address) && (
                  <div className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold text-sm mb-2">Dropoff Location</p>
                    {carRentalData.dropoffLocation.location && <p className="text-sm text-gray-700">Location: {carRentalData.dropoffLocation.location}</p>}
                    {carRentalData.dropoffLocation.address && <p className="text-sm text-gray-700">Address: {carRentalData.dropoffLocation.address}</p>}
                    {carRentalData.dropoffLocation.phone && <p className="text-sm text-gray-700">Phone: {carRentalData.dropoffLocation.phone}</p>}
                  </div>
                )}

                {(carRentalData.rentalInfo.carType || carRentalData.rentalInfo.mileageCharges) && (
                  <div className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold text-sm mb-2">Vehicle Information</p>
                    {carRentalData.rentalInfo.carType && <p className="text-sm text-gray-700">Car Type: {carRentalData.rentalInfo.carType}</p>}
                    {carRentalData.rentalInfo.mileageCharges && <p className="text-sm text-gray-700">Mileage Charges: ${carRentalData.rentalInfo.mileageCharges}</p>}
                    {carRentalData.rentalInfo.carDetails && <p className="text-sm text-gray-700">Details: {carRentalData.rentalInfo.carDetails}</p>}
                  </div>
                )}

                <div className="border-t pt-3 mt-3">
                  <p className="font-semibold">Total Cost: ${carRentalData.totalCost || '0.00'}</p>
                </div>
              </div>
            )}


            {/* Display Activities if they exist */}
            {activityData.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-100 rounded-md border border-yellow-300">
                <h3 className="text-lg font-semibold mb-3">Activity Details</h3>
                {activityData.map((activity) => (
                  <div key={activity.id} className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold">{activity.activityName}</p>
                    <p className="text-sm text-gray-700">Start: {activity.startDate} {activity.startTime}</p>
                    <p className="text-sm text-gray-700">End: {activity.endDate} {activity.endTime}</p>
                    <p className="text-sm text-gray-700">Venue: {activity.venue}</p>
                    <p className="text-sm text-gray-700">Address: {activity.address}</p>
                    <p className="text-sm text-gray-700">Phone: {activity.phone}</p>
                    <p className="text-sm text-gray-700">Website: {activity.website}</p>
                    <p className="text-sm text-gray-700">Email: {activity.email}</p>
                    <p className="text-sm text-gray-700">Total Cost: ${activity.totalCost}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Display Lodging if it exists */}
            {lodgingData.length > 0 && (
              <div className="mb-6 p-4 bg-purple-100 rounded-md border border-purple-300">
                <h3 className="text-lg font-semibold mb-3">Lodging Details</h3>
                {lodgingData.map((lodging) => (
                  <div key={lodging.id} className="mb-3 p-3 bg-white rounded border">
                    <p className="font-semibold">{lodging.lodgingName}</p>
                    <p className="text-sm text-gray-700">Start: {lodging.startDate} {lodging.startTime}</p>
                    <p className="text-sm text-gray-700">End: {lodging.endDate} {lodging.endTime}</p>
                    <p className="text-sm text-gray-700">Venue: {lodging.venue}</p>
                    <p className="text-sm text-gray-700">Address: {lodging.address}</p>
                    <p className="text-sm text-gray-700">Phone: {lodging.phone}</p>
                    <p className="text-sm text-gray-700">Website: {lodging.website}</p>
                    <p className="text-sm text-gray-700">Email: {lodging.email}</p>
                    <p className="text-sm text-gray-700">Confirmation: {lodging.confirmationNumber}</p>
                    <p className="text-sm text-gray-700">Total Cost: ${lodging.totalCost}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-6 grid grid-cols-2 gap-3">
              <Link to="add-activity" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full">
                <FaCalendarAlt /> Add Activity
              </Link>
              <Link to="add-flight" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full">
                <FaPlane /> Add Flight
              </Link>
              <Link to="add-lodging" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full">
                <FaHotel /> Add Lodging
              </Link>
              <Link to="add-car" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 focus:outline-none focus:shadow-outline w-full">
                <FaCar /> Add Car Rental
              </Link>
            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default AddTripPage