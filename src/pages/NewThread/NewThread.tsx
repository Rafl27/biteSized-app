import React, { useState } from 'react'
import './NewThread.css'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import TopBar from '../../components/topBar/TopBar'

function App({ storyID, useRepliesAPI  }) {
  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt urna eget lacus fringilla maximus. Sed lacinia, ipsum vel facilisis viverra, sapien mi placerat quam, vel ultrices urna mauris non augue.'
  )
  const [image, setImage] = useState(
    'https://via.placeholder.com/400x300.png?text=Image+URL'
  )
  const [showModal, setShowModal] = useState(false)
  const [createdStoryName, setCreatedStoryName] = useState('')
  const [hasImage, setHasImage] = useState(false) // State for checkbox
  const MIN_CHARACTER_LIMIT = 100

  const isCreateButtonDisabled =
    !text || text.length < MIN_CHARACTER_LIMIT || (hasImage && !image)
  const getCreateButtonTooltip = () => {
    if (!image && hasImage) {
      return 'Please enter an image URL'
    } else if (!text) {
      return 'Please enter the first paragraph'
    } else if (text.length < MIN_CHARACTER_LIMIT) {
      return `Minimum character limit is ${MIN_CHARACTER_LIMIT}`
    }
  }

  const handleCreateStory = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const art = formData.get('img')
    const content = formData.get('text')
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    console.log(storyID)
    const apiUrl = useRepliesAPI
        ? `${import.meta.env.VITE_API_BASE_URL}/comment/${storyID}/replies`
        : `${import.meta.env.VITE_API_BASE_URL}/comment/${storyID}`;
    try {
      const response = await axios.post(
          apiUrl,
        {
          // name,
          content,
          art
        },
        config
      )
      // setCreatedStoryName(name)
      setShowModal(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {/* <TopBar /> */}
      <div className="container">
        <form className="createStory-form" onSubmit={handleCreateStory}>
          <div className="inputs">
            {/* Checkbox for image option */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={hasImage}
                onChange={(e) => setHasImage(e.target.checked)}
              />
              {/*<span className="checkbox-custom" />*/}
              Will this thread have an image?
            </label>
            {/* Conditional image URL input */}
            {hasImage && (
              <input
                type="text"
                placeholder="Image URL"
                name="img"
                className={`image-input ${hasImage ? 'fade-in' : ''}`}
                onChange={(e) => setImage(e.target.value)}
              />
            )}
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
            <p>The new thread has been posted.</p>
          </Modal.Body>
          <Modal.Footer>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/story/${createdStoryName}`}
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
          {hasImage && image && (
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
