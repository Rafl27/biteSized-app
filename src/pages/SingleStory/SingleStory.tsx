import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './SingleStory.css'
import TopBar from '../../components/topBar/TopBar'
import NewThread from '../NewThread/NewThread'
import { RiChat3Line } from 'react-icons/ri'
import { UserData } from '../../interfaces'

const API_ENDPOINT = 'http://localhost:8080'

interface Story {
  _id: number;
  title: string;
  content: string;
  date: string;
  upvotes: number;
  downvotes: number;
  art: string;
}
interface Comment {
  idComment: number;
  contentComment: string;
  artComment: string;
  dateComment: string;
  upvotesComment: number;
  downvotesComment: number;
  useridComment: number;
  parentCommentId: number | null;
}

const SingleStory = () => {
  const [story, setStory] = useState<Story>({
    _id: '',
    name: '',
    text: '',
    img: '',
    user: {
      _id: '',
      name: '',
      profilePicture: '',
    },
    date: '',
    comments: [],
  })
  const { _id } = useParams()

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/story/${_id}`)
        setStory(response.data)
      } catch (error) {
        console.log(error)
        // TODO: Handle the error and display a message to the user
      }
    }
    fetchStory()
  }, [_id])

  const [userData, setUserData] = useState<UserData>({
    username: '',
    email:'',
    profilePicture:''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const response = await axios.get(`${API_ENDPOINT}/user/info/story/${_id}`)
        setUserData(response.data)
      }catch (error){
        console.log(error)
      }
    }
    fetchUserData()
  }, [_id]);
  console.log('abaixo é o user data em')
  console.log(userData)

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal)
  }
  console.log(story)

  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal()
    }
  }

  const handleCommentReply = (commentId: string) => {
    axios
      .post(`${API_ENDPOINT}/story/${story._id}/comments/${commentId}/replies`)
      .then((response) => {
        // Handle the response if needed
      })
      .catch((error) => {
        console.log(error)
        // TODO: Handle the error and display a message to the user
      })
  }

  const handleNestedReply = (commentId: string, replyId: string) => {
    axios
      .post(
        `${API_ENDPOINT}/story/${_id}/comments/${commentId}/replies/${replyId}/response`
      )
      .then((response) => {
        // Handle
      })
      .catch((error) => {
        console.log(error)
        // TODO: Handle the error
      })
  }

  const CommentComponent = ({ comment }: { comment: Comment }) => (
    <div key={comment._id} className="comment">
      <div className="userInfo">
        <img
          src={comment.user?.profilePicture || ''}
          alt="user profile picture"
        />
        <p className="userName">{comment.user?.name}</p>
      </div>
      <img className="story-img-threads" src={comment.img} alt="" />
      <p className="commentText">{comment.text}</p>
      <button className="replyButton">
        <RiChat3Line className="chatIcon" />
        Reply
      </button>
      {comment.replies &&
        comment.replies.map((reply) => (
          <ReplyComponent key={reply._id} reply={reply} />
        ))}
    </div>
  )

  const ReplyComponent = ({ reply }: { reply: Comment }) => (
    <div key={reply._id} className="reply">
      <div className="userInfo">
        <img
          src={reply.user?.profilePicture || ''}
          alt="user profile picture"
        />
        <p className="userName">{reply.user?.name}</p>
      </div>
      <img className="story-img-threads" src={reply.img} alt="" />
      <p className="replyText">{reply.text}</p>
      <button className="replyButton">
        <RiChat3Line className="chatIcon" />
        Reply
      </button>
      {reply.nestedReplies &&
        reply.nestedReplies.map((nestedReply) => (
          <div key={nestedReply._id} className="nested-reply">
            <div className="userInfo">
              <img
                src={nestedReply.user?.profilePicture || ''}
                alt="user profile picture"
              />
              <p className="userName">{nestedReply.user?.name}</p>
            </div>
            <img className="story-img-threads" src={nestedReply.img} alt="" />
            <p className="replyText">{nestedReply.text}</p>
            <button className="replyButton">
              <RiChat3Line className="chatIcon" />
              Reply
            </button>
          </div>
        ))}
    </div>
  )

  return (
    <>
      <TopBar />
      <div className="single-story-container">
        <div className="header">
          <h1>{story.title}</h1>
          {story.art && (
            <img className="story-img" src={story.art} alt={story.title} />
          )}
          <p>Published on: {new Date(story.date).toLocaleDateString()}</p>
          <p>
            <img
              className="profilePicture"
              src={userData.profilePicture || ''}
              alt="user profile picture"
            />
            {userData.username}
          </p>
        </div>
        <div className="add-comment">
          <button className="add-comment-button" onClick={toggleModal}>
            New thread
          </button>
          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close-button" onClick={toggleModal}>
                  Close
                </button>
                <NewThread storyID={story._id} />
              </div>
            </div>
          )}
        </div>
        <div className="content">
          <p>{story.text}</p>
        </div>
        <h2>Threads:</h2>
        <div className="comments">
          {story.comments &&
            story.comments.map((comment) => (
              <CommentComponent key={comment._id} comment={comment} />
            ))}
        </div>
      </div>
    </>
  )
}

export default SingleStory
