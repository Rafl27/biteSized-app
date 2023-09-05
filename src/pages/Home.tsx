import React, { useEffect, useState } from 'react'
import StoryCard from '../components/Stories/StoryCard/StoryCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdCookie } from 'react-icons/md'
import { BiTrendingUp } from 'react-icons/bi'
import { IoIosCreate } from 'react-icons/io'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/topBar/TopBar'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null as { name: string } | null)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const items = [
    { name: 'BiteSized', icon: MdCookie, link: '/home' },
    { link: '/profile', },
    { name: 'Trending', icon: BiTrendingUp, link: '/trending' },
    { name: 'Create', icon: IoIosCreate, link: '/create' },
    { name: 'Logout', icon: RiLogoutBoxRLine, onClick: handleLogout },
  ]
  return (
    <>
      <TopBar />
      <div
        style={{
          display: 'flex',
          background: '#171616',
        }}
      >
        <StoryCard />
      </div>
    </>
  )
}

export default Home
