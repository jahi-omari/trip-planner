import React from 'react'

const AddTripPage = () => {
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
                id="title"
                name="title"
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
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="mm/dd/yyyy"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >End Date</label
              >
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="mm/dd/yyyy"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="itinerary"
                className="block text-gray-700 font-bold mb-2"
                >Itinerary/Description</label
              >
              <textarea
                id="itinerary"
                name="itinerary"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add daily activities etc."
              ></textarea>
            </div>

            <div>
              <button
                className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
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