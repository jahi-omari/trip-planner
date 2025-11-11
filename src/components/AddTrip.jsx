import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import { FaGlobeAmericas } from 'react-icons/fa'

const HomeCards = () => {
  return (
    <section className="py-4">
        {/* Set max width and center card while maintaining responsiveness */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">
              <FaGlobeAmericas className='inline text-xl mr-2 mb-1'/>
                Explore
              </h2>
            <p className="mt-2 mb-4">
              Add trip details such as location, date, itinerary, etc.
            </p>
            {/* Move button to the right of the card */}
            <div className="flex justify-end">
                <Link
                    to="/add-trip"
                    className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                    Add Trip
            </Link>
            </div>
            
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCards