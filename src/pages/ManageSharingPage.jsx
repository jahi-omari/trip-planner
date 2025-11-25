
import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaUser, FaUserPlus, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { TripContext } from '../context/TripContext'
// COMMENTED OUT: Backend API imports for testing with mock data
// import { getTripMembers, addTripMember, removeTripMember, getAllUsers, getCurrentUser } from '../utils/api'


const ManageSharingPage = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const { upcomingTrips = [] } = useContext(TripContext) || {}
  const trip = upcomingTrips?.find(t => String(t.id) === String(tripId))
  
  // Mock data for testing
  const mockUsers = [
    { id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com' },
    { id: 2, first_name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com' },
    { id: 3, first_name: 'Charlie', last_name: 'Davis', email: 'charlie.davis@example.com' },
    { id: 4, first_name: 'Diana', last_name: 'Martinez', email: 'diana.martinez@example.com' },
    { id: 5, first_name: 'Ethan', last_name: 'Wilson', email: 'ethan.wilson@example.com' }
  ]
  
  const mockCurrentUser = { id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com' }
  
  const mockMembers = [
    { id: 1, user_id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com', role: 'owner' },
    { id: 2, user_id: 2, first_name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com', role: 'editor' },
    { id: 3, user_id: 3, first_name: 'Charlie', last_name: 'Davis', email: 'charlie.davis@example.com', role: 'viewer' }
  ]
  
  const [currentUser, setCurrentUser] = useState(null)
  const [members, setMembers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('viewer')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showRemoveNotification, setShowRemoveNotification] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId])

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers([])
      setShowDropdown(false)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = allUsers.filter(user => {
        // Exclude current user and already added members
        const isCurrentUser = currentUser && user.id === currentUser.id
        const isAlreadyMember = members.some(member => member.user_id === user.id)
        if (isCurrentUser || isAlreadyMember) return false
        
        // Filter by name or email
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
        return fullName.includes(query) || user.email.toLowerCase().includes(query)
      })
      setFilteredUsers(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }, [searchQuery, allUsers, members, currentUser])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // COMMENTED OUT: Backend API calls
      // const [userResponse, membersResponse, usersResponse] = await Promise.all([
      //   getCurrentUser(),
      //   getTripMembers(tripId),
      //   getAllUsers()
      // ])
      // setCurrentUser(userResponse)
      // setMembers(membersResponse || [])
      // setAllUsers(usersResponse || [])
      
      // Using mock data for testing
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading
      setCurrentUser(mockCurrentUser)
      setMembers(mockMembers)
      setAllUsers(mockUsers)
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async (user) => {
    try {
      setError(null)
      
      // COMMENTED OUT: Backend API call
      // await addTripMember(tripId, {
      //   email: user.email,
      //   role: selectedRole
      // })
      // const membersResponse = await getTripMembers(tripId)
      // setMembers(membersResponse || [])
      
      // Using mock data for testing
      const newMember = {
        id: members.length + 1,
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: selectedRole
      }
      setMembers([...members, newMember])
      
      // Show notification
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      
      // Clear search
      setSearchQuery('')
      setShowDropdown(false)
    } catch (err) {
      console.error('Error adding member:', err)
      setError(err.message || 'Failed to add member')
    }
  }

  const handleRemoveMember = async (memberId, role) => {
    // Prevent removing owner
    if (role === 'owner') {
      alert('Cannot remove the trip owner')
      return
    }

    try {
      setError(null)
      
      // COMMENTED OUT: Backend API call
      // await removeTripMember(tripId, memberId)
      // const membersResponse = await getTripMembers(tripId)
      // setMembers(membersResponse || [])
      
      // Using mock data for testing
      setMembers(members.filter(m => m.id !== memberId))
      
      // Show notification
      setShowRemoveNotification(true)
      setTimeout(() => setShowRemoveNotification(false), 3000)
    } catch (err) {
      console.error('Error removing member:', err)
      setError(err.message || 'Failed to remove member')
    }
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-400 text-black'
      case 'editor':
        return 'bg-green-400 text-black'
      case 'viewer':
        return 'bg-blue-300 text-black'
      default:
        return 'bg-gray-400 text-black'
    }
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case 'owner':
        return 'Creator'
      case 'editor':
        return 'Editor'
      case 'viewer':
        return 'Member'
      default:
        return role
    }
  }

  if (loading) {
    return (
      <section className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 max-w-2xl w-full">
          <p className="text-center font-black uppercase text-lg">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 min-h-screen py-6 sm:py-12 px-4">
      {/* Add Member Notification Popup */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-[slideUpFade_3s_ease-in-out]">
          <div className="bg-green-400 text-black font-black uppercase px-6 py-4 border-4 border-black rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            ✓ Trip Member Added
          </div>
        </div>
      )}

      {/* Remove Member Notification Popup */}
      {showRemoveNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-[shakeAndSlide_3s_ease-in-out]">
          <div className="bg-red-500 text-white font-black uppercase px-6 py-4 border-4 border-black rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-black mr-2">✕</span> Trip Member Removed
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/upcoming-trips-page')}
          className="inline-flex items-center gap-2 bg-white text-black font-black uppercase px-4 py-2 border-4 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mb-6"
        >
          <FaArrowLeft /> Back to Trips
        </button>

        <div className="bg-white border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 sm:mb-6">
            Manage Sharing
          </h2>
          
          <div className="mb-6 p-4 bg-gray-100 border-2 border-black rounded">
            <p className="font-bold text-sm uppercase text-gray-700">Trip</p>
            <p className="font-black text-lg">{trip?.tripName || 'Unknown Trip'}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-4 border-red-600 rounded">
              <p className="font-bold text-red-900">{error}</p>
            </div>
          )}

          {/* Add Member Section */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-black uppercase mb-4 flex items-center gap-2">
              <FaUserPlus /> Add Member
            </h3>
            
            {/* Search Input */}
            <div className="mb-4 relative">
              <label className="block text-gray-900 font-black uppercase mb-2 text-xs sm:text-sm">
                Search Users
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type name or email..."
                className="border-4 border-black rounded w-full py-2 sm:py-3 px-3 sm:px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              />
              
              {/* Dropdown */}
              {showDropdown && filteredUsers.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-60 overflow-y-auto">
                  {filteredUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => handleAddMember(user)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b-2 border-black last:border-b-0 transition-colors"
                    >
                      <p className="font-black text-sm">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-gray-600 font-bold">{user.email}</p>
                    </button>
                  ))}
                </div>
              )}
              
              {searchQuery && filteredUsers.length === 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <p className="text-sm font-bold text-gray-600">No users found</p>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-gray-900 font-black uppercase mb-2 text-xs sm:text-sm">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border-4 border-black rounded w-full py-2 sm:py-3 px-3 sm:px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <option value="viewer">Member (Viewer)</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>

          {/* Members List */}
          <div>
            <h3 className="text-lg sm:text-xl font-black uppercase mb-4">
              Trip Members ({members.length})
            </h3>
            
            {members.length === 0 ? (
              <div className="p-6 bg-gray-100 border-2 border-black rounded text-center">
                <p className="font-bold text-gray-600">No members yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {members.map(member => (
                  <div
                    key={member.id}
                    className="p-4 bg-white border-4 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <FaUser className="text-lg sm:text-xl text-gray-700 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm sm:text-base truncate">
                          {member.first_name} {member.last_name}
                          {currentUser && member.user_id === currentUser.id && (
                            <span className="ml-2 text-xs font-bold text-gray-600">(You)</span>
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-bold truncate">{member.email}</p>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded font-black uppercase text-xs ${getRoleBadgeColor(member.role)} flex-shrink-0`}>
                        {getRoleLabel(member.role)}
                      </span>
                    </div>
                    {member.role !== 'owner' && (
                      <button
                        onClick={() => handleRemoveMember(member.id, member.role)}
                        className="bg-red-600 text-white font-bold px-2 py-2 sm:px-3 sm:py-2 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex-shrink-0"
                        title="Remove member"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManageSharingPage
