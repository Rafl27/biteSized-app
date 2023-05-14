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
          placeholder="First Paragraph"
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="output">
        {name && <h1>{name}</h1>}
        {image && <img id="createImage" src={image} alt="User input" />}
        {text && <h5>{text}</h5>}
      </div>
    </div>
  )
}

export default App
