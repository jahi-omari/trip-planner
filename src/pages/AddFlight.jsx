import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaPlane, FaHotel, FaCar, FaPencilAlt } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'

// Single flight component used for each created flight
const FlightItem = ({ flight, onChange, onRemove, onAdd, canRemove }) => {
  const { id, departure, airline, flightNumber, seats, customName } = flight
  const [isEditingName, setIsEditingName] = useState(false)
  const [editNameValue, setEditNameValue] = useState(customName || `Flight ${id}`)

  const handlePickerChange = (e) => {
    const val = e.target.value // yyyy-mm-dd
    if (!val) return onChange(id, 'departure', '')
    const [y, m, d] = val.split('-')
    onChange(id, 'departure', `${m}/${d}/${y}`)
  }

  const handleSaveName = () => {
    onChange(id, 'customName', editNameValue)
    setIsEditingName(false)
  }

  const displayName = customName || `Flight ${id}`

  return (
    <div className="mb-6 p-4 border rounded-md bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{displayName}</h3>
          {!isEditingName && (
            <button type="button" onClick={() => setIsEditingName(true)} title="Edit Flight Name" className="text-blue-600 hover:text-blue-800">
              <FaPencilAlt />
            </button>
          )}
        </div>
        {canRemove && (
          <button type="button" onClick={() => onRemove(id)} className="text-sm text-red-600 hover:underline">Remove</button>
        )}
      </div>

      {isEditingName && (
        <div className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            value={editNameValue}
            onChange={(e) => setEditNameValue(e.target.value)}
            className="border rounded py-2 px-3 flex-1"
            placeholder="Enter flight name"
            autoFocus
          />
          <button type="button" onClick={handleSaveName} className="text-sm text-green-600 hover:underline">Save</button>
          <button type="button" onClick={() => setIsEditingName(false)} className="text-sm text-gray-600 hover:underline">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Departure Date</label>
          <input
            type="date"
            value={departure}
            onChange={(e) => onChange(id, 'departure', e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Airline</label>
          <input type="text" value={airline} onChange={(e) => onChange(id, 'airline', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Airline name" />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Flight Number</label>
          <input type="text" value={flightNumber} onChange={(e) => onChange(id, 'flightNumber', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="e.g. BA123" />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Seats</label>
          <input type="text" value={seats} onChange={(e) => {
            const val = e.target.value;
            if (/^[a-zA-Z0-9]*$/.test(val)) {
              onChange(id, 'seats', val);
            }
          }} className="border rounded w-full py-2 px-3" placeholder="Seats" />
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={() => onAdd && onAdd()}
          className="text-sm text-indigo-600 hover:underline"
        >
          Add another flight
        </button>
      </div>
    </div>
  )
}

const AddFlight = () => {
  const navigate = useNavigate()
  const _ctx = useContext(TripContext) || {}
  const { setFlightData, flightData, selectedTrip } = _ctx

  // keep the per-page start/end states if you need them for the overall flight booking
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // dynamic flights list - initialize with context data if available, otherwise one empty flight
  const [flights, setFlights] = useState(() => {
    if (flightData?.flights?.length > 0) return flightData.flights.map(f => ({ ...f }))
    return [{ id: 1, departure: '', airline: '', flightNumber: '', seats: '', customName: '' }]
  })
  const [nextId, setNextId] = useState(() => {
    if (flightData?.flights?.length > 0) {
      return Math.max(...flightData.flights.map(f => f.id)) + 1
    }
    return 2
  })
  const [totalCost, setTotalCost] = useState(() => flightData?.totalCost || '')

  // Convert mm/dd/yyyy to yyyy-mm-dd (kept for parity with other pages)
  const formatDateToInput = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length !== 3) return ''
    const [month, day, year] = parts
    return `${year}-${month}-${day}`
  }

  const handleStartDateChange = (e) => setStartDate(e.target.value)
  const handleEndDateChange = (e) => setEndDate(e.target.value)

  const addFlight = () => {
    setFlights((prev) => [...prev, { id: nextId, departure: '', airline: '', flightNumber: '', seats: '', customName: '' }])
    setNextId((n) => n + 1)
  }

  const updateFlight = (id, field, value) => {
    setFlights((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
  }

  const removeFlight = (id) => setFlights((prev) => prev.filter((f) => f.id !== id))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save flight data to context
    setFlightData({
      flights: flights,
      totalCost: totalCost
    })
    // Redirect to edit-trip page if editing, otherwise add-trip page
    if (selectedTrip) {
      navigate('/trip-details/edit-trip')
    } else {
      navigate('/add-trip')
    }
  }

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Flight</h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                <input type="text" id="totalCost" name="totalCost" value={totalCost} onChange={(e) => {
                  const val = e.target.value;
                  if (/^[0-9.]*$/.test(val)) {
                    setTotalCost(val);
                  }
                }} className="border rounded w-full py-2 px-3 mb-2" placeholder="eg. 299.99" />
              </div>



              {/* Render dynamic flight items */}
              {flights.map((f) => (
                <FlightItem
                  key={f.id}
                  flight={f}
                  onChange={updateFlight}
                  onRemove={removeFlight}
                  onAdd={addFlight}
                  canRemove={flights.length > 1}
                />
              ))}

              <div>
                <button className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Save Flights</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddFlight