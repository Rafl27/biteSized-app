import React from 'react'
import './TopBar.css'
import { MdCookie } from 'react-icons/md'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { BsPlusCircleFill } from 'react-icons/bs'
import { BiTrendingUp } from 'react-icons/bi'

const TopBar: React.FC = () => {
  const userPicture = localStorage.getItem('profilePicture')
  const userName = localStorage.getItem('name')

  return (
    <div className="top-bar">
      <div className="logo">
        <MdCookie className="cookie-icon" />
        BiteSized
      </div>
      <div className="options">
        {userPicture && (
          <div className="option">
            <img className="ppTop" src={userPicture} alt="Profile" />
            {userName}
          </div>
        )}
        <div className="option">
          <BsPlusCircleFill className="BsPlusCircleFill" />
        </div>
        <div className="option">
          <BiTrendingUp className="BiTrendingUp" />
        </div>

        <div className="option">
          <RiLogoutBoxRLine className="RiLogoutBoxRLine" />
        </div>
      </div>
    </div>
  )
}

export default TopBar
