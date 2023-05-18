import React from 'react'
import './ProfilePage.css'

interface ProfilePageProps {
  name: string
  profilePicture: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, profilePicture }) => {
  const userName = name || localStorage.getItem('name')
  return (
    <div className="profile-page">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <h2>{userName}</h2>
    </div>
  )
}

export default ProfilePage
