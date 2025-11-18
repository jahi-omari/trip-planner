import React from 'react'

const AddActivity = () => {
  return (
    <>
    <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-3 m-4 md:m-0">
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Activity</h2>

            {/* Activity Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Activity Name</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Activity Name" />
            </div>

            {/* Start Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                <input type="date" className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">Start Time</label>
                <input type="time" className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* End Date & Time */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">End Date</label>
                <input type="date" className="border rounded w-full py-2 px-3" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-2">End Time</label>
                <input type="time" className="border rounded w-full py-2 px-3" />
              </div>
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Venue</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Venue" />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Address" />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input type="text" className="border rounded w-full py-2 px-3" placeholder="Phone number" />
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

            <div>
              <button className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">Save Activity</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default AddActivity