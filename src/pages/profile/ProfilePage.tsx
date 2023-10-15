import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import TopBar from '../../components/topBar/TopBar'
import axios from "axios";

interface ProfilePageProps {
  name: string
  profilePicture: string
}

interface Story {
  title: string
  content: string
  art: string
  upvotes: number
  downvotes: number
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, profilePicture }) => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
  }, [])

  const token = localStorage.getItem('token');

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    id: ''
  });

  const [userBio, setUserBio] = useState({
    bio : ''
  })

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/info`, config)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
    }
  }, [token]);

  useEffect(() => {
    if (token){
      const config = {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }

      axios.get(`http://localhost:8080/user/bio/${userData.id}`, config)
          .then(response => {
            setUserBio(response.data)
          })
          .catch(error => {
            console.error("Error fetching user bio", error)
          })
    }
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/story/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }

      const storiesData = await response.json()
      setStories(storiesData)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  // const userName = name || localStorage.getItem('name')
  // const userPicture = profilePicture || localStorage.getItem('profilePicture')
  // const pictureSrc = userPicture !== null ? userPicture : undefined

  return (
    <>
      <TopBar />
      <div className="profile-page">
        <div className="profile-picture">
          <img src={userData.profilePicture} alt="Profile" />
        </div>
        <h2>{userData.username}</h2>
        <p>{userBio.bio}</p>
        <div className="story-list">
          <div className="column">
            {stories.slice(0, Math.ceil(stories.length / 2)).map((story) => (
                <div className="story" key={story.title}>
                  <h3>{story.title}</h3>
                  <img src={story.art} alt={story.title} className="card-img-top" />
                  <p className="story-text">{story.content}</p>
                  <p>Upvotes: {story.upvotes}</p>
                  <p>Downvotes: {story.downvotes}</p>
                </div>
                ))}
          </div>
          <div className="column">
            {stories.slice(Math.ceil(stories.length / 2)).map((story) => (
                    <div className="story" key={story.title}>
                      <h3>{story.title}</h3>
                      <img src={story.art} alt={story.title} className="card-img-top" />
                      <p className="story-text">{story.content}</p>
                      <p>Upvotes: {story.upvotes}</p>
                      <p>Downvotes: {story.downvotes}</p>
                    </div>
                    ))}
          </div>
          ))
        </div>
      </div>
    </>
  )
}

export default ProfilePage
