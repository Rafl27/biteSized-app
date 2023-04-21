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
    <div className="d-flex flex-wrap">
      {stories.map((story) => (
        <div
          key={story._id}
          className="card col-1 h-100"
          style={{ width: '60vw' }}
        >
          <div className="card-body">
            <img src={story.img} alt={story.name} className="card-img-top" />
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
                    {/* <div>
                      {comment.replies.map((reply) => (
                        <div key={reply._id} className="card">
                          <div className="card-body">
                            <p className="card-text">{reply.text}</p>
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div> */}
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
