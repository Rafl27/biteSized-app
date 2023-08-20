import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {formatDate} from "../../../utils/dateUtils";
import './StoryCard.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import {StoryCard as Story} from "../../../interfaces/StoryCard";
import {fetchStories} from "../../../services/api";

const StoryCard: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
        .then(data => setStories(data))
        .catch(error => console.log('Error', error))
  }, [])

  const [upvoteClicked, setUpvoteClicked] = useState<string[]>([])
  const [downvoteClicked, setDownvoteClicked] = useState<string[]>([])

  const handleUpvote = async (id: string) => {
    try {
      const res = await axios.put(`http://localhost:3000/story/${id}/upvote`)
      const updatedStory = res.data
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === updatedStory._id ? updatedStory : story
        )
      )
      setUpvoteClicked((prevClicked) => [...prevClicked, id])
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownvote = async (id: string) => {
    try {
      const res = await axios.put(`http://localhost:3000/story/${id}/downvote`)
      const updatedStory = res.data
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === updatedStory._id ? updatedStory : story
        )
      )
      setDownvoteClicked((prevClicked) => [...prevClicked, id])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {stories.map((story) => (
        <div
          key={story.storyId}
          className="card "
          style={{ flex: '0 0 48%', margin: '1%' }}
        >
          <div className="card-body" style={{ flex: '1 1 auto' }}>
            <img
              src={story.art}
              alt={story.title}
              className="card-img-top"
            />
            <p className="created">Created: {formatDate(story.date)}</p>
            <div className="userInfo">
            <img
                className="profilePicture"
                src={story.profile_picture}
                alt="user profile picture"
              />
              <p className="userName">{story.username}</p>
            </div>
            <div className="card-title-container">
              <h3 className="card-title">{story.title}</h3>
              <div className="vote-container">
                <button
                  className={`vote-button upvote ${
                    upvoteClicked.includes(story._id) ? 'clicked' : ''
                  }`}
                  onClick={() => handleUpvote(story._id)}
                  disabled={
                    upvoteClicked.includes(story._id) ||
                    downvoteClicked.includes(story._id)
                  }
                >
                  {story.upvotes}
                  <ImArrowUp />
                </button>
                <button
                  className={`vote-button downvote ${
                    downvoteClicked.includes(story._id) ? 'clicked' : ''
                  }`}
                  onClick={() => handleDownvote(story._id)}
                  disabled={
                    downvoteClicked.includes(story._id) ||
                    upvoteClicked.includes(story._id)
                  }
                >
                  {story.downvotes}
                  <ImArrowDown />
                </button>
              </div>
            </div>
            <p className="card-text">{story.content}</p>
            <Link to={`/story/${story.storyId}`} className="btn btn-secondary">
              Continue reading
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoryCard
