import React, { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter image URL"
        onChange={(e) => setImage(e.target.value)}
      />

      {name && <h1>{name}</h1>}
      {image && <img src={image} alt="User input" />}
      {text && <h5>{text}</h5>}
    </div>
  )
}

export default App
