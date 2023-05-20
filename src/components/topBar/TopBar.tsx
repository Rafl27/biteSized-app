import React from 'react'
import './TopBar.css'
import { MdCookie } from 'react-icons/md'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { BsPlusCircleFill } from 'react-icons/bs'
import { BiTrendingUp } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const TopBar: React.FC = () => {
  const userPicture = localStorage.getItem('profilePicture')
  const userName = localStorage.getItem('name')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('profilePicture')
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <div className="top-bar">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to="/home"
        className="link-home"
      >
        <div className="logo">
          <MdCookie className="cookie-icon" />
          BiteSized
        </div>
      </Link>
      <div className="options">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
          {userPicture && (
            <div className="option">
              <img className="ppTop" src={userPicture} alt="Profile" />
              {userName}
            </div>
          )}
        </Link>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/create">
          <div className="option">
            <BsPlusCircleFill className="BsPlusCircleFill" />
          </div>
        </Link>
        <div className="option">
          <BiTrendingUp className="BiTrendingUp" />
        </div>

        <div className="option">
          <RiLogoutBoxRLine
            className="RiLogoutBoxRLine"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  )
}

export default TopBar
