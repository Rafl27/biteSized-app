import React from 'react'
import StoryCard from '../components/Stories/StoryCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar2 from '../components/sideBar2/SideBar2'
import { MdCookie } from 'react-icons/md'
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { BiTrendingUp } from 'react-icons/bi'

// background: 'linear-gradient(to right, #f8b195, #f67280)',

const items = [
  { name: 'BiteSized', icon: MdCookie, link: '/home' },
  { name: 'Profile', icon: GiPlagueDoctorProfile, link: '/profile' },
  { name: 'Trending', icon: BiTrendingUp, link: '/trending' },
]

const Home: React.FC = () => {
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
