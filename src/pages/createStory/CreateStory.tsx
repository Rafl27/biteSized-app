import React, { useState } from 'react'
import './CreateStory.css'
import axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  //true if any of the inputs are empty
  const isCreateButtonDisabled = !name || !text || !image
  const getCreateButtonTooltip = () => {
    if (!name) {
      return 'Please enter a story title'
    } else if (!image) {
      return 'Please enter an image URL'
    } else if (!text) {
      return 'Please enter the first paragraph'
    }
  }
  const handleCreateStory = async (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const img = formData.get('img')
    const text = formData.get('text')
    try {
      const response = await axios.post('http://localhost:3000/story', {
        name,
        text,
        img,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container">
      <form className="createStory-form" onSubmit={handleCreateStory}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Story Title"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="img"
            onChange={(e) => setImage(e.target.value)}
          />
          <textarea
            placeholder="First Paragraph"
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            id="createButton"
            disabled={isCreateButtonDisabled}
            type="submit"
            title={isCreateButtonDisabled ? getCreateButtonTooltip() : ''}
            className={
              isCreateButtonDisabled ? 'disabled-button' : 'enabled-button'
            }
          >
            Create
          </button>
        </div>
      </form>

      <div className="output">
        {/* && is used for when a certain variable is available, if not it won't be rendered. */}
        {name && <h1>{name}</h1>}
        {image && (
          <div className="image-wrapper">
            <img id="createImage" src={image} alt="User input" />
          </div>
        )}
        {text && (
          <div className="paragraph-wrapper">
            <h5 id="paragraph">{text}</h5>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
