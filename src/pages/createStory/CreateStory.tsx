import React, { useState } from 'react'
import './CreateStory.css'

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
  return (
    <div className="container">
      <div className="inputs">
        <input
          type="text"
          placeholder="Story Title"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="First Paragraph"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          id="createButton"
          disabled={isCreateButtonDisabled}
          title={isCreateButtonDisabled ? getCreateButtonTooltip() : ''}
        >
          Create
        </button>
      </div>

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
