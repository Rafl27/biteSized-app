import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {RiChat3Line} from 'react-icons/ri';

import './SingleStory.css';

import ThreadedComments from "../../components/ThreadedComments/ThreadedComments";
import TopBar from '../../components/topBar/TopBar';
import NewThread from '../NewThread/NewThread';

import {UserData, Story, Comment} from '../../interfaces';
import {fetchCommentsByStoryId, fetchUserData, fetchStory} from '../../services/api';

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

    //TODO fix the size of comment art =D
    //TODO change this variable to storyID
    const {_id} = useParams()

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
                        <img className="story-img" src={story.art} alt={story.title}/>
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
                                <NewThread storyID={story._id}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="content">
                    <p>{story.content}</p>
                </div>
                <h2>Threads:</h2>
            </div>
            <ThreadedComments comments={comments} />
        </>
    )
}

export default SingleStory
