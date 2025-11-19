import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'

const TripDetailsPage = () => {
  const ctx = useContext(TripContext)
  const selectedTrip = ctx?.selectedTrip ?? null

  if (!selectedTrip) {
    return (
      <section className="bg-indigo-50 py-10">
        <div className="container m-auto px-6 max-w-3xl">
          <Link
            to="/upcoming-trips-page"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className='mr-2'/> Back to Upcoming Trips 
          </Link>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <p className="text-gray-600">No trip selected. Please select a trip from the upcoming trips page.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/upcoming-trips-page"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className='mr-2'/> Back to Upcoming Trips 
        </Link>
      </div>
    </section>

    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6 max-w-3xl mx-auto px-4 m-auto">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left border-3"
            >
              <div className="text-gray-500 mb-4">{selectedTrip.startDate} - {selectedTrip.endDate}</div>
              <h1 className="text-3xl font-bold mb-4">
                {selectedTrip.tripName}
              </h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                ></i>
                <p className="text-red-700">{selectedTrip.tripLocation}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6 border-3">
              <h3 className="text-indigo-800 text-lg font-bold mb-6">
                Trip Details
              </h3>

              {selectedTrip.description && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedTrip.description}</p>
                </div>
              )}

              {/* Activity Details */}
              {selectedTrip.activityData && selectedTrip.activityData.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">🗓️ Activity Details</h4>
                  {selectedTrip.activityData.map((activity) => (
                    <div key={activity.id} className="mb-3 pb-3 border-b border-yellow-200 last:border-b-0">
                      <p className="font-bold">{activity.activityName}</p>
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

              {/* Flight Details */}
              {selectedTrip.flightData && selectedTrip.flightData.flights.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">✈️ Flight Details</h4>
                  {selectedTrip.flightData.flights.map((flight) => (
                    <div key={flight.id} className="mb-3 pb-3 border-b border-blue-200 last:border-b-0">
                      <p className="font-bold">{flight.customName || `Flight ${flight.id}`}</p>
                      <p className="text-sm text-gray-700">Airline: {flight.airline}</p>
                      <p className="text-sm text-gray-700">Flight Number: {flight.flightNumber}</p>
                      <p className="text-sm text-gray-700">Departure: {flight.departure}</p>
                      <p className="text-sm text-gray-700">Seats: {flight.seats}</p>
                    </div>
                  ))}
                  {selectedTrip.flightData.totalCost && (
                    <p className="font-bold text-lg mt-3">Total Cost: ${selectedTrip.flightData.totalCost}</p>
                  )}
                </div>
              )}

              {/* Car Rental Details */}
              {selectedTrip.carRentalData && selectedTrip.carRentalData.rentalAgency && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">🚗 Car Rental Details</h4>
                  <p className="text-sm text-gray-700 mb-2">Agency: {selectedTrip.carRentalData.rentalAgency}</p>
                  <p className="text-sm text-gray-700 mb-2">Pickup: {selectedTrip.carRentalData.pickupDate} at {selectedTrip.carRentalData.pickupTime}</p>
                  <p className="text-sm text-gray-700 mb-2">Dropoff: {selectedTrip.carRentalData.dropoffDate} at {selectedTrip.carRentalData.dropoffTime}</p>
                  {selectedTrip.carRentalData.confirmationNumber && <p className="text-sm text-gray-700 mb-2">Confirmation: {selectedTrip.carRentalData.confirmationNumber}</p>}
                  {selectedTrip.carRentalData.website && <p className="text-sm text-gray-700 mb-2">Website: {selectedTrip.carRentalData.website}</p>}
                  {selectedTrip.carRentalData.email && <p className="text-sm text-gray-700 mb-2">Email: {selectedTrip.carRentalData.email}</p>}
                  
                  {selectedTrip.carRentalData.pickupLocation.location && (
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-sm font-bold mb-1">Pickup Location</p>
                      <p className="text-sm text-gray-700">{selectedTrip.carRentalData.pickupLocation.location}</p>
                      {selectedTrip.carRentalData.pickupLocation.address && <p className="text-sm text-gray-700">{selectedTrip.carRentalData.pickupLocation.address}</p>}
                      {selectedTrip.carRentalData.pickupLocation.phone && <p className="text-sm text-gray-700">{selectedTrip.carRentalData.pickupLocation.phone}</p>}
                    </div>
                  )}

                  {selectedTrip.carRentalData.dropoffLocation.location && (
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-sm font-bold mb-1">Dropoff Location</p>
                      <p className="text-sm text-gray-700">{selectedTrip.carRentalData.dropoffLocation.location}</p>
                      {selectedTrip.carRentalData.dropoffLocation.address && <p className="text-sm text-gray-700">{selectedTrip.carRentalData.dropoffLocation.address}</p>}
                      {selectedTrip.carRentalData.dropoffLocation.phone && <p className="text-sm text-gray-700">{selectedTrip.carRentalData.dropoffLocation.phone}</p>}
                    </div>
                  )}

                  {selectedTrip.carRentalData.rentalInfo.carType && (
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-sm font-bold mb-1">Vehicle Info</p>
                      <p className="text-sm text-gray-700">Type: {selectedTrip.carRentalData.rentalInfo.carType}</p>
                      {selectedTrip.carRentalData.rentalInfo.mileageCharges && <p className="text-sm text-gray-700">Mileage: ${selectedTrip.carRentalData.rentalInfo.mileageCharges}</p>}
                      {selectedTrip.carRentalData.rentalInfo.carDetails && <p className="text-sm text-gray-700">Details: {selectedTrip.carRentalData.rentalInfo.carDetails}</p>}
                    </div>
                  )}

                  {selectedTrip.carRentalData.totalCost && (
                    <p className="font-bold text-lg mt-3">Total Cost: ${selectedTrip.carRentalData.totalCost}</p>
                  )}
                </div>
              )}

              {/* Lodging Details */}
              {selectedTrip.lodgingData && selectedTrip.lodgingData.length > 0 && (
                <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">🏨 Lodging Details</h4>
                  {selectedTrip.lodgingData.map((lodging) => (
                    <div key={lodging.id} className="mb-3 pb-3 border-b border-purple-200 last:border-b-0">
                      <p className="font-bold">{lodging.lodgingName}</p>
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
            </div>
          </main>

          <aside>
            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6 border-3">
              <h3 className="text-xl font-bold mb-6">Manage Trip</h3>
              <Link
                to="edit-trip"
                className="bg-indigo-900 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Trip</Link
              >
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Trip
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  )
}

export default TripDetailsPage