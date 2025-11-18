import React, { useState } from 'react'
import { FaCalendarAlt, FaPlane, FaHotel, FaCar } from 'react-icons/fa'

// Single flight component used for each created flight
const FlightItem = ({ flight, onChange, onRemove, onAdd }) => {
  const { id, departure, airline, flightNumber, seats } = flight

  const handlePickerChange = (e) => {
    const val = e.target.value // yyyy-mm-dd
    if (!val) return onChange(id, 'departure', '')
    const [y, m, d] = val.split('-')
    onChange(id, 'departure', `${m}/${d}/${y}`)
  }

  return (
    <div className="mb-6 p-4 border rounded-md bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Flight {id}</h3>
        <button type="button" onClick={() => onRemove(id)} className="text-sm text-red-600 hover:underline">Remove</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Departure</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={departure}
              onChange={(e) => onChange(id, 'departure', e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="mm/dd/yyyy"
            />
            <input type="date" onChange={handlePickerChange} className="border rounded py-2 px-3" aria-label={`Flight ${id} date picker`} />
          </div>
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
          <input type="number" value={seats} onChange={(e) => onChange(id, 'seats', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Seats" min="0" />
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
  // keep the per-page start/end states if you need them for the overall flight booking
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // dynamic flights list
  const [flights, setFlights] = useState([])
  const [nextId, setNextId] = useState(1)

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
    setFlights((prev) => [...prev, { id: nextId, departure: '', airline: '', flightNumber: '', seats: '' }])
    setNextId((n) => n + 1)
  }

  const updateFlight = (id, field, value) => {
    setFlights((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
  }

  const removeFlight = (id) => setFlights((prev) => prev.filter((f) => f.id !== id))

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder: do something with flights
    console.log('Submitted flights:', flights)
  }

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Flight</h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Flight Confirmation Number</label>
                <input type="text" id="flightConfirmationNumber" name="flightConfirmationNumber" className="border rounded w-full py-2 px-3 mb-2" placeholder="Enter Confirmation Number" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
                <input type="text" id="totalCost" name="totalCost" className="border rounded w-full py-2 px-3 mb-2" placeholder="eg. 299.99" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleStartDateChange} className="border rounded w-full py-2 px-3 mb-2" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">End Date</label>
                <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleEndDateChange} className="border rounded w-full py-2 px-3 mb-2" />
              </div>

              <div className="mb-4 flex justify-end">
                <button type="button" onClick={addFlight} className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">Add Flight</button>
              </div>

              {/* Render dynamic flight items */}
              {flights.map((f) => (
                <FlightItem key={f.id} flight={f} onChange={updateFlight} onRemove={removeFlight} onAdd={addFlight} />
              ))}

              {flights.length > 0 && (
                <div>
                  <button className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Save Flights</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddFlight