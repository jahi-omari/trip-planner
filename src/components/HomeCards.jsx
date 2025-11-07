import React from 'react'
import Card from './Card'

const HomeCards = () => {
  return (
    <section className="py-4">
        {/* Set max width and center card while maintaining responsiveness */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">Explore</h2>
            <p className="mt-2 mb-4">
              Add trip details such as location, date, itinerary, etc.
            </p>
            {/* Move button to the right of the card */}
            <div className="flex justify-end">
                <a
                    href="/new.html"
                    className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                    Add Trip
            </a>
            </div>
            
          </Card>
          {/* <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 mb-4">
              List your job to find the perfect developer for the role
            </p>
            <a
              href="/add-job.html"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Job
            </a>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default HomeCards