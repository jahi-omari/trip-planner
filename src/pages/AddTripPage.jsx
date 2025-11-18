import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaPlane, FaHotel, FaCar } from 'react-icons/fa'

const AddTripPage = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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
  return (
    <>
      <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0"
        >
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Trip</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Trip Name</label
              >
              <input
                type="text"
                id="tripName"
                name="tripName"
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
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add daily activities etc."
              ></textarea>
            </div>

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