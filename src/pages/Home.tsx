import React from 'react'
import StoryCard from '../components/Stories/StoryCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar2 from '../components/sideBar2/SideBar2'
import { AiFillHome } from 'react-icons/ai'
import { BiTrendingUp } from 'react-icons/bi'

// background: 'linear-gradient(to right, #f8b195, #f67280)',

const items = [
  { name: 'BiteSized', icon: AiFillHome, link: '/' },
  { name: 'Profile', icon: BiTrendingUp, link: '/about' },
  { name: 'Trending', icon: 'email', link: '/contact' },
]

const Home: React.FC = () => {
  return (
    <>
      <Sidebar2 items={items} />
      <StoryCard />
    </>
  )
}

export default Home
