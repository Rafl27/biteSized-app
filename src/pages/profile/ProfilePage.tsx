import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import TopBar from '../../components/topBar/TopBar'

interface ProfilePageProps {
  name: string
  profilePicture: string
}

interface Story {
  name: string
  text: string
  img: string
  upvotes: number
  downvotes: number
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, profilePicture }) => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/story/usercollection',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const userName = name || localStorage.getItem('name')
  const userPicture = profilePicture || localStorage.getItem('profilePicture')
  const pictureSrc = userPicture !== null ? userPicture : undefined

  return (
    <>
      <TopBar />
      <div className="profile-page">
        <div className="profile-picture">
          <img src={pictureSrc} alt="Profile" />
        </div>
        <h2>{userName}</h2>
        <div className="story-list">
          {stories.map((story) => (
            <div className="story" key={story.name}>
              <h3>{story.name}</h3>
              <img src={story.img} alt={story.name} />
              <p className="story-text">{story.text}</p>

              <p>Upvotes: {story.upvotes}</p>
              <p>Downvotes: {story.downvotes}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfilePage
