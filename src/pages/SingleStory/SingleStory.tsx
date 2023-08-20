import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './SingleStory.css'
import TopBar from '../../components/topBar/TopBar'
import NewThread from '../NewThread/NewThread'
import { RiChat3Line } from 'react-icons/ri'
import { UserData } from '../../interfaces'
import { Story } from "../../interfaces";
import { Comment} from "../../interfaces";
import { fetchCommentsByStoryId, fetchUserData, fetchStory } from '../../services/api'

const initialStoryState = {
  _id: '',
  name: '',
  text: '',
  img: '',
  date: '',
  content: ''
};

const initialUserDataState = {
  username: '',
  email:'',
  profilePicture:''
}

const SingleStory = () => {
  const [story, setStory] = useState<Story>(initialStoryState)

  //TODO change this variable to storyID
  const { _id } = useParams()

  useEffect(() => {
    fetchStory(_id)
        .then(data => setStory(data))
        .catch(error => console.error('Error:', error))
  }, [_id]);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchCommentsByStoryId(_id)
        .then(data => setComments(data))
        .catch(error => console.error('Error:', error));
  }, []);

  const [userData, setUserData] = useState<UserData>(initialUserDataState)

  useEffect(() => {
    fetchUserData(_id)
        .then(data => setUserData(data))
        .catch(error => console.log('Error: ', error))
  }, [_id]);

  //TODO fix the size of comment art =D

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal)
  }

  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal()
    }
  }

  const CommentComponent = ({ comment }: { comment: Comment }) => (
    <div key={comment.idComment} className="comment">
      <div className="userInfo">
        <img
          src={comment.userProfilePic || ''}
          alt="user profile picture"
        />
        <p className="userName">{comment.userUsername}</p>
      </div>
      <img className="story-img-threads" src={comment.artComment} alt="" />
      <p className="commentText">{comment.contentComment}</p>
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
          <p>{story.content}</p>
        </div>
        <h2>Threads:</h2>
        <div className="comments">
          {comments &&
            comments.map((comment) => (
              <CommentComponent key={comment._id} comment={comment} />
            ))}
        </div>
      </div>
    </>
  )
}

export default SingleStory
