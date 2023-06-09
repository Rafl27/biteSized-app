import React, { useState } from 'react'
import './CreateStory.css'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import TopBar from '../../components/topBar/TopBar'

function App() {
  //TODO: now the button is always green because useState has values.
  const [name, setName] = useState('My Story Title')
  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt urna eget lacus fringilla maximus. Sed lacinia, ipsum vel facilisis viverra, sapien mi placerat quam, vel ultrices urna mauris non augue.'
  )
  const [image, setImage] = useState(
    'https://via.placeholder.com/400x300.png?text=Image+URL'
  )
  const [showModal, setShowModal] = useState(false)
  const [createdStoryName, setCreatedStoryName] = useState('')
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
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/story',
        {
          name,
          text,
          img,
        },
        config
      )
      setCreatedStoryName(name)
      setShowModal(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <TopBar />
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Story Posted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{createdStoryName} has been posted.</p>
          </Modal.Body>
          <Modal.Footer>
            <a
              href={`http://localhost:3000/story/${createdStoryName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Story
            </a>
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

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
    </>
  )
}

export default App
