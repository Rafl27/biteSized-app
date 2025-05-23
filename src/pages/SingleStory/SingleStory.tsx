import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import './SingleStory.css';

import ThreadedComments from "../../components/ThreadedComments/ThreadedComments";
import TopBar from '../../components/topBar/TopBar';
import NewThread from '../NewThread/NewThread';

import {UserData, Story, Comment} from '../../interfaces';
import {fetchCommentsByStoryId, fetchUserData, fetchStory} from '../../services/api';
import ImageExpander from "../../components/ImageExpander/ImageExpander";

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
    email: '',
    profilePicture: ''
}

const SingleStory = () => {
    const [story, setStory] = useState<Story>(initialStoryState)
    //TODO change this variable to storyID
    const {_id} = useParams()
    const token: string = localStorage.getItem('token')

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

    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        if (!token) {
            window.location.href = '/auth';
            return;
        }
        setShowModal((prevShowModal) => !prevShowModal)
    }

    const closeModal = (event) => {
        if (event.target === event.currentTarget) {
            toggleModal()
        }
    }

    return (
        <>
            <TopBar/>
            <div className="single-story-container">
                <div className="header">
                    <h1>{story.title}</h1>
                    {story.art && (
                        <ImageExpander
                            src={story.art}
                            alt={story.title}
                        />
                    )}
                    <p>Published on: {new Date(story.date).toLocaleDateString()}</p>
                    <Link to={`/visit-profile/${userData.id}`}>
                        <img
                            className="profilePicture"
                            src={userData.profilePicture || ''}
                            alt="user profile picture"
                        />
                        {userData.username}
                    </Link>
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
                                <NewThread storyID={_id}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="content">
                    <p>{story.content}</p>
                </div>


            </div>

            <div className='threads-div'>
                <h2 id='threadsh2'>Threads:</h2>
                <ThreadedComments comments={comments} />
            </div>
        </>
    )
}

export default SingleStory
