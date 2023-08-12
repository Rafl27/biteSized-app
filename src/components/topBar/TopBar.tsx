import React, {useEffect, useState} from 'react'
import './TopBar.css'
import { MdCookie } from 'react-icons/md'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { BsPlusCircleFill } from 'react-icons/bs'
import { BiTrendingUp } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const TopBar: React.FC = () => {
  const userPicture = localStorage.getItem('profilePicture')
  const userName = localStorage.getItem('name')
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('profilePicture')
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch user data from the API with the token
      axios.get('http://localhost:8080/user/info', config)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            // Handle error if the API request fails
            console.error('Error fetching user data:', error);
          });
    }
  }, [token]);

  console.log(userData)

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
              <img className="ppTop" src={userData.profilePicture} alt="Profile" />
              {userData.username}
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
