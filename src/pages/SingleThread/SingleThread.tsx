import './SingleThread.css'
import React, {useEffect, useState} from "react";
import {Comment} from "../../interfaces";
import {fetchSingleComment} from "../../services/api";
import {useParams} from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";

const initialCommentState = {
    idComment: 0,
    contentComment: '',
    artComment: '',
    dateComment: '',
    upvotesComment: 0,
    downvotesComment: 0,
    useridComment: 0,
    parentCommentId: 0,
    userProfilePic: '',
    userUsername: '',
    userEmail: ''
};

const SingleThread = () => {
    const [comment, setComment] = useState<Comment>(initialCommentState)
    const {commentId} = useParams()
    useEffect(() => {
        fetchSingleComment(commentId)
            .then(data => {
                setComment(data[0]);
            })
            .catch(error => console.error("Error: ", error));
    }, []);

    // console.log(comment)
    return (
        <>
            <TopBar/>
            <div className="single-story-container">
                <div className="header">
                    {comment.artComment && (
                        <img className="story-img" src={comment.artComment} alt={comment.idComment}/>
                    )}
                    <p>Published on: {new Date(comment.dateComment).toLocaleDateString()}</p>
                    <p>
                        <img
                            className="profilePicture"
                            src={comment.userProfilePic || ''}
                            alt="user profile picture"
                        />
                        {comment.userUsername}
                    </p>
                </div>
                <div className="content">
                    <p>{comment.contentComment}</p>
                </div>

            </div>
        </>
    )
}

export default SingleThread
