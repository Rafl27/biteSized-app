import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './StoryCard.css'

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
            <p>Created: {story.date}</p>
            <img
              src={story.img}
              alt={story.name}
              className="card-img-top"
              // style={{ maxHeight: '400px', maxWidth: '500px' }}
            />
            <h3 className="card-title">{story.name}</h3>
            <p className="card-text">{story.text}</p>

            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-danger">Delete</button>
            <button className="btn btn-secondary">Continue reading</button>
            <div>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoryCard
