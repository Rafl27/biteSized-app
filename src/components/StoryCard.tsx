import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  return (
    <div>
      {stories.map((story) => (
        <div key={story._id}>
          <h3>{story.name}</h3>
          <p>{story.text}</p>
          <img src={story.img} alt={story.name} />
          <button>Edit</button>
          <button>Delete</button>
          <button>Add Comment</button>
          <div>
            {story.comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.text}</p>
                <button>Edit</button>
                <button>Delete</button>
                <button>Add Reply</button>
                <div>
                  {comment.replies.map((reply) => (
                    <div key={reply._id}>
                      <p>{reply.text}</p>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoryCard
