import React from 'react'
import { FaUser, FaUserPlus } from 'react-icons/fa'

const ManageSharingPage = () => {
  // Placeholder for creator (no auth yet)
  const creator = {
    name: 'Trip Creator (You)',
    email: 'you@example.com',
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white border-4 border-black rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="inline-block bg-black text-white px-3 py-1 rounded mr-2">Participants</span>
        </h2>
        <div className="mb-6 p-4 bg-gray-100 border-2 border-black rounded flex items-center gap-4">
          <FaUser className="text-2xl text-black" />
          <div>
            <p className="font-bold text-lg">{creator.name}</p>
            <p className="text-sm text-gray-700">{creator.email}</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white border-4 border-black font-black uppercase py-3 px-4 mt-2 hover:scale-105 transition-transform duration-200 text-lg">
          <FaUserPlus className="text-xl" /> Invite
        </button>
      </div>
    </section>
  )
}

export default ManageSharingPage
