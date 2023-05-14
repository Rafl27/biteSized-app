import React, { useState } from 'react'
import './CreateStory.css'

function App() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

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
        <button id="createButton">Create</button>
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
