import React from 'react'
import StoryCard from '../components/Stories/StoryCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar2 from '../components/sideBar2/SideBar2'

// background: 'linear-gradient(to right, #f8b195, #f67280)',

const items = [
  { name: 'Home', icon: 'home', link: '/' },
  { name: 'About', icon: 'info', link: '/about' },
  { name: 'Contact', icon: 'email', link: '/contact' },
]

const Home: React.FC = () => {
  return (
    <>
      {/* <SideBar /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar2 items={items} />
          </div>
          <div className="col-md-9">{/* Content */}</div>
        </div>
      </div>
      <StoryCard />
    </>
  )
}

export default Home
