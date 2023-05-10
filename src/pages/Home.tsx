import React, { useEffect, useState } from 'react'
import StoryCard from '../components/Stories/StoryCard/StoryCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar2 from '../components/sideBar2/SideBar2'
import { MdCookie } from 'react-icons/md'
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { BiTrendingUp } from 'react-icons/bi'
import { IoIosCreate } from 'react-icons/io'
import axios from 'axios'

// background: 'linear-gradient(to right, #f8b195, #f67280)',

const Home: React.FC = () => {
  const [user, setUser] = useState(null as { name: string } | null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    } else if (token) {
      // Make a request to the server to get the user's details
      axios
        .get('http://localhost:3000/user/getuserinfo', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const items = [
    { name: 'BiteSized', icon: MdCookie, link: '/home' },
    {
      name: user ? user.name : 'Profile',
      icon: GiPlagueDoctorProfile,
      link: '/profile',
    },
    { name: 'Trending', icon: BiTrendingUp, link: '/trending' },
    { name: 'Create', icon: IoIosCreate, link: '/create' },
  ]
  return (
    <>
      <div
        style={{
          display: 'flex',
          background: '#FF784F',
        }}
      >
        <Sidebar2 items={items} />
        <StoryCard />
      </div>
    </>
  )
}

export default Home
