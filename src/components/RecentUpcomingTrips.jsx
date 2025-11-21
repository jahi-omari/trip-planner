import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLink } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'

const RecentUpcomingTrips = () => {
  const _ctx = useContext(TripContext) || {}
  const { upcomingTrips, setSelectedTrip } = _ctx
  const navigate = useNavigate()

  // Limit Trips to 3 on homepage
  const recentTrips = upcomingTrips.slice(0, 3)

  const handleViewTrip = (trip) => {
    setSelectedTrip(trip)
    navigate('/upcoming-trips-page/trip-details')
  }

  // Only render if there are trips
  if (upcomingTrips.length === 0) {
    return null
  }

  return (
    <section className="bg-indigo-50 px-4 py-10">
      <div className="max-w-4xl mx-auto px-4 m-auto">
        <h2 className="text-3xl font-bold text-black-900 mb-6 text-center">
          Upcoming Trips
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-md space-y-4">
            {recentTrips.map((trip) => (
              <div key={trip.id}>
                {/* Neo Brutalism Card */}
                <div className="bg-white border-4 border-black p-6 shadow-lg">
                  <div className="mb-4 pb-4 border-b-4 border-black">
                    <h3 className="text-2xl font-black mb-2 uppercase">{trip.tripName}</h3>
                    <p className="text-sm font-bold uppercase text-gray-700">📍 {trip.tripLocation}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-bold mb-2">📅 DATES</p>
                    <p className="font-mono text-gray-800">{trip.startDate} → {trip.endDate}</p>
                  </div>

                  {trip.description && (
                    <div className="mb-4 p-3 bg-gray-100 border-2 border-black">
                      <p className="text-xs font-black uppercase mb-1">Description</p>
                      <p className="text-sm text-gray-800">{trip.description}</p>
                    </div>
                  )}
                  
                  {/* Show flight details if available */}
                  {trip.flightData && trip.flightData.flights.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-100 border-3 border-black">
                      <p className="text-xs font-black uppercase mb-2">✈️ Flights ({trip.flightData.flights.length})</p>
                      {trip.flightData.flights.map((flight) => (
                        <p key={flight.id} className="text-sm font-bold text-gray-800 mb-1">{flight.customName || `Flight ${flight.id}`} - {flight.airline}</p>
                      ))}
                      {trip.flightData.totalCost && <p className="text-sm font-black mt-2">TOTAL: ${trip.flightData.totalCost}</p>}
                    </div>
                  )}

                  {/* Show car rental details if available */}
                  {trip.carRentalData && trip.carRentalData.rentalAgency && (
                    <div className="mb-4 p-3 bg-green-100 border-3 border-black">
                      <p className="text-xs font-black uppercase mb-2">🚗 Car Rental</p>
                      <p className="text-sm font-bold text-gray-800 mb-1">{trip.carRentalData.rentalAgency}</p>
                      {trip.carRentalData.totalCost && <p className="text-sm font-black mt-2">TOTAL: ${trip.carRentalData.totalCost}</p>}
                    </div>
                  )}

                  {/* Show lodging details if available */}
                  {trip.lodgingData && trip.lodgingData.length > 0 && (
                    <div className="mb-4 p-3 bg-purple-100 border-3 border-black">
                      <p className="text-xs font-black uppercase mb-2">🏨 Lodging ({trip.lodgingData.length})</p>
                      {trip.lodgingData.map((lodging) => (
                        <p key={lodging.id} className="text-sm font-bold text-gray-800 mb-1">{lodging.lodgingName} - {lodging.venue}</p>
                      ))}
                    </div>
                  )}

                  {/* Show activity details if available */}
                  {trip.activityData && trip.activityData.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-100 border-3 border-black">
                      <p className="text-xs font-black uppercase mb-2">🗓️ Activities ({trip.activityData.length})</p>
                      {trip.activityData.map((activity) => (
                        <p key={activity.id} className="text-sm font-bold text-gray-800 mb-1">{activity.activityName} - {activity.venue}</p>
                      ))}
                    </div>
                  )}

                  {/* View Trip Button */}
                  <button
                    onClick={() => handleViewTrip(trip)}
                    className="w-full bg-black text-white border-4 border-black font-black uppercase py-3 px-4 mt-4 hover:scale-105 transition-transform duration-200 text-lg"
                  >
                    View Trip
                  </button>
                  {/* Manage Sharing Button */}
                  <button
                    onClick={() => navigate(`/upcoming-trips-page/manage-sharing/${trip.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-white border-4 border-black font-black uppercase py-3 px-4 mt-3 hover:bg-gray-100 transition-colors duration-200 text-lg text-black shadow"
                  >
                    <FaLink className="text-xl" /> Manage Sharing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecentUpcomingTrips