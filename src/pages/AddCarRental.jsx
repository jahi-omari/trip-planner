import React from 'react'

const AddCarRental = () => {
  return (
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Car Rental</h2>

            {/* Rental Agency */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rental Agency</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Rental Agency" />
            </div>

            {/* Pickup Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Pickup Date</label>
                <input type="date" className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Pickup Time</label>
                <input type="time" className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Dropoff Date & Time */}
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Dropoff Date</label>
                <input type="date" className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Dropoff Time</label>
                <input type="time" className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Website</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Website" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" className="border rounded w-full py-2 px-3" placeholder="Email" />
            </div>

            {/* Confirmation Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Confirmation Number</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Confirmation number" />
            </div>

            {/* Total Cost */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Total Cost</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Total Cost"
                onChange={e => {
                  const val = e.target.value;
                  if (/^[0-9.]*$/.test(val)) {
                    e.target.value = val;
                  } else {
                    e.target.value = val.replace(/[^0-9.]/g, '');
                  }
                }}
              />
            </div>

            {/* Pickup Location Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Pickup Location</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Pickup Location</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Pickup location" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Phone" />
            </div>

            {/* Dropoff Location Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Dropoff Location</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Dropoff Location</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Dropoff location" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Phone" />
            </div>

            {/* Rental Information Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Rental Information</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Car Type</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Car type" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Mileage Charges</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Mileage charges"
                onChange={e => {
                  const val = e.target.value;
                  if (/^[0-9.]*$/.test(val)) {
                    e.target.value = val;
                  } else {
                    e.target.value = val.replace(/[^0-9.]/g, '');
                  }
                }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Car Details</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Car details" />
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