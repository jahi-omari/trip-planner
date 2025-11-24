import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../context/TripContext'

const AddCarRental = () => {
  const navigate = useNavigate()
  const _ctx = useContext(TripContext) || {}
  const { setCarRentalData, carRentalData = {}, selectedTrip } = _ctx

  const [formData, setFormData] = useState(() => {
    // Initialize with context data if available (for edit mode)
    if (carRentalData?.rentalAgency) {
      return { ...carRentalData }
    }
    return {
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
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleTotalCostChange = (e) => {
    const val = e.target.value
    if (/^[0-9.]*$/.test(val)) {
      setFormData(prev => ({
        ...prev,
        totalCost: val
      }))
    }
  }

  const handleMileageChange = (e) => {
    const val = e.target.value
    if (/^[0-9.]*$/.test(val)) {
      handleNestedChange('rentalInfo', 'mileageCharges', val)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save car rental data to context
    setCarRentalData(formData)
    // Navigate to edit-trip if editing, otherwise add-trip
    if (selectedTrip) {
      navigate('/trip-details/edit-trip')
    } else {
      navigate('/add-trip')
    }
  }
  return (
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Car Rental</h2>

            {/* Rental Agency */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rental Agency</label>
              <input type="text" name="rentalAgency" value={formData.rentalAgency} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Rental Agency" />
            </div>

            {/* Pickup Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Pickup Date</label>
                <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="border rounded w-full py-2 px-3" min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Pickup Time</label>
                <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Dropoff Date & Time */}
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Dropoff Date</label>
                <input type="date" name="dropoffDate" value={formData.dropoffDate} onChange={handleChange} className="border rounded w-full py-2 px-3" min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Dropoff Time</label>
                <input type="time" name="dropoffTime" value={formData.dropoffTime} onChange={handleChange} className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Website</label>
              <input type="text" name="website" value={formData.website} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Website" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Email" />
            </div>

            {/* Confirmation Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Confirmation Number</label>
              <input type="text" name="confirmationNumber" value={formData.confirmationNumber} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="Confirmation number" />
            </div>

            {/* Total Cost */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
              <input
                type="text"
                name="totalCost"
                value={formData.totalCost}
                onChange={handleTotalCostChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Total Cost"
              />
            </div>

            {/* Pickup Location Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Pickup Location</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Pickup Location</label>
              <input type="text" value={formData.pickupLocation.location} onChange={(e) => handleNestedChange('pickupLocation', 'location', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Pickup location" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" value={formData.pickupLocation.address} onChange={(e) => handleNestedChange('pickupLocation', 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input type="text" value={formData.pickupLocation.phone} onChange={(e) => handleNestedChange('pickupLocation', 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
            </div>

            {/* Dropoff Location Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Dropoff Location</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Dropoff Location</label>
              <input type="text" value={formData.dropoffLocation.location} onChange={(e) => handleNestedChange('dropoffLocation', 'location', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Dropoff location" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" value={formData.dropoffLocation.address} onChange={(e) => handleNestedChange('dropoffLocation', 'address', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input type="text" value={formData.dropoffLocation.phone} onChange={(e) => handleNestedChange('dropoffLocation', 'phone', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Phone" />
            </div>

            {/* Rental Information Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Rental Information</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Car Type</label>
              <input type="text" value={formData.rentalInfo.carType} onChange={(e) => handleNestedChange('rentalInfo', 'carType', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Car type" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Mileage Charges</label>
              <input
                type="text"
                value={formData.rentalInfo.mileageCharges}
                onChange={handleMileageChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Mileage charges"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Car Details</label>
              <input type="text" value={formData.rentalInfo.carDetails} onChange={(e) => handleNestedChange('rentalInfo', 'carDetails', e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Car details" />
            </div>

            <div>
              <button className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Save Car Rental</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddCarRental