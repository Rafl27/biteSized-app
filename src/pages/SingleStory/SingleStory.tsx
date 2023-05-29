import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './SingleStory.css'
import TopBar from '../../components/topBar/TopBar'

interface Story {
  _id: string
  name: string
  text: string
  img?: string
  user: {
    _id: string
    name: string
    profilePicture: string
  }
  date: string
  comments: Comment[]
}

interface Comment {
  _id: string
  user: {
    _id: string
    name: string
  }
  text: string
  replies: Comment[]
}

const SingleStory = () => {
  const [story, setStory] = useState<Story>({
    _id: '',
    name: '',
    text: '',
    img: '',
    user: {
      _id: '',
      name: '',
    },
    date: '',
    comments: [],
  })

  const { _id } = useParams()

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/story/${_id}`)
        setStory(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStory()
  }, [_id])

  return (
    <>
      <TopBar />
      <div className="single-story-container">
        <div className="header">
          <h1>{story.name}</h1>
          {story.img && <img src={story.img} alt={story.name} />}
          <p>Published on: {new Date(story.date).toLocaleDateString()}</p>
          <p>
            <img
              className="profilePicture"
              src={story.user.profilePicture}
              alt="user profile picture"
            />
            {story.user.name}
          </p>
        </div>
        <div className="content">
          <p>{story.text}</p>
        </div>
        <div className="comments">
          <h2>Comments:</h2>
          {story.comments &&
            story.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.text}</p>
                <p>By: {comment.user}</p>
                {comment.replies &&
                  comment.replies.map((reply) => (
                    <div key={reply._id} className="reply">
                      <p>{reply.text}</p>
                      <p>Replied by: {reply.user && reply.user.name}</p>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default SingleStory
