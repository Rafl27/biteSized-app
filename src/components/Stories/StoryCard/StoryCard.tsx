import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {formatDate} from "../../../utils/dateUtils";
import './StoryCard.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import {StoryCard as Story} from "../../../interfaces/StoryCard";
import {downvoteStory, fetchStories, upvoteStory} from "../../../services/api";

const StoryCard: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
        .then(data => setStories(data))
        .catch(error => console.log('Error', error))
  }, [])

  const token : string = localStorage.getItem('token');
  const [upvoteClicked, setUpvoteClicked] = useState<number[]>([]);
  const [downvoteClicked, setDownvoteClicked] = useState<number[]>([]);

  const handleUpvote = async (storyId: number) => {
    try {
      const updatedStory = await upvoteStory(storyId, token);
      setStories((prevStories) =>
          prevStories.map((story) =>
              story.storyId === updatedStory.id
                  ? { ...story, upvotes: updatedStory.upvote }
                  : story
          )
      );
      setUpvoteClicked((prevClicked) => [...prevClicked, storyId]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDownvote = async (storyId: number) => {
      try {
          const updatedStory = await downvoteStory(storyId, token)
          setStories((prevStories) =>
              prevStories.map((story) =>
                  story.storyId === updatedStory.id
                      ? { ...story, downvotes: updatedStory.downvote }
                      : story
              )
          );
          setDownvoteClicked((prevClicked) => [...prevClicked, storyId]);
      } catch (err) {
          console.error(err);
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
                  onClick={() => handleUpvote(story.storyId)}
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
                  onClick={() => handleDownvote(story.storyId)}
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
