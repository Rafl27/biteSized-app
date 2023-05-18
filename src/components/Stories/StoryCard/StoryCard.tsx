import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { formatDistanceToNow, format } from 'date-fns'
import './StoryCard.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'

interface Comment {
  _id: string
  text: string
  replies: Reply[]
}

interface Reply {
  _id: string
  text: string
}

interface Story {
  _id: string
  name: string
  text: string
  img: string
  comments: Comment[]
  date: string
  user: string
  upvotes: number
  downvotes: number
}

const StoryCard: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get<Story[]>('http://localhost:3000/story')
        setStories(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchStories()
  }, [])

  const formatDate = (date: string): string => {
    const currentDate = new Date()
    const storyDate = new Date(date)
    const differenceInDays = Math.floor(
      (currentDate.getTime() - storyDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (differenceInDays >= 365) {
      return format(storyDate, 'yyyy-MM-dd')
    } else if (differenceInDays >= 30) {
      const differenceInMonths = Math.floor(differenceInDays / 30)
      return `${differenceInMonths} month${
        differenceInMonths > 1 ? 's' : ''
      } ago`
    } else if (differenceInDays >= 7) {
      const differenceInWeeks = Math.floor(differenceInDays / 7)
      return `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''} ago`
    } else if (differenceInDays >= 1) {
      return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`
    } else {
      return 'Today'
    }
  }

  const [upvoteClicked, setUpvoteClicked] = useState<string[]>([])
  const [downvoteClicked, setDownvoteClicked] = useState<string[]>([])

  //TODO: Show the upvote and downvote count on the front end.
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
          key={story._id}
          className="card "
          style={{ flex: '0 0 48%', margin: '1%' }}
        >
          <div className="card-body" style={{ flex: '1 1 auto' }}>
            <p>
              Created: {formatDate(story.date)} by {story.user.name}
            </p>
            <img
              src={story.img}
              alt={story.name}
              className="card-img-top"
              // style={{ maxHeight: '400px', maxWidth: '500px' }}
            />
            <div className="card-title-container">
              <h3 className="card-title">{story.name}</h3>
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
                  <ImArrowDown />
                </button>
              </div>
            </div>
            <p className="card-text">{story.text}</p>

            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-danger">Delete</button>
            <Link to={`/story/${story._id}`} className="btn btn-secondary">
              Continue reading
            </Link>
            {/* <div>
                {story.comments.map((comment) => (
                  <div key={comment._id} className="card">
                    <div className="card-body">
                      <p className="card-text">{comment.text}</p>
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                      <button className="btn btn-secondary">
                        Continue reading
                      </button>
                    </div>
                  </div>
                ))}
              </div> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoryCard
