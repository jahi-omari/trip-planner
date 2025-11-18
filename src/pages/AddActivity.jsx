import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../context/TripContext'

const AddActivity = () => {
  const navigate = useNavigate()
  const { activityData, setActivityData } = useContext(TripContext)

  const [form, setForm] = useState({
    activityName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venue: '',
    address: '',
    phone: '',
    website: '',
    email: '',
    totalCost: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'totalCost') {
      if (!/^[0-9.]*$/.test(value)) return
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setActivityData(prev => [...prev, { ...form, id: Date.now() }])
    setForm({
      activityName: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      venue: '',
      address: '',
      phone: '',
      website: '',
      email: '',
      totalCost: ''
    })
    navigate('/add-trip')
  }

  return (
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Activity</h2>

            {/* Activity Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Activity Name</label>
              <input type="text" name="activityName" value={form.activityName} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Activity Name" />
            </div>

            {/* Start Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Start Time</label>
                <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* End Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">End Date</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">End Time</label>
                <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Venue</label>
              <input type="text" name="venue" value={form.venue} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Venue" />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Phone number" />
            </div>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Website</label>
              <input type="text" name="website" value={form.website} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Website" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Email" />
            </div>

            {/* Total Cost */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
              <input
                type="text"
                name="totalCost"
                value={form.totalCost}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Total Cost"
              />
            </div>

            <div>
              <button className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Save Activity</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddActivity