import './SingleThread.css'
import {useEffect, useState} from "react";
import {Comment} from "../../interfaces";
import {fetchSingleComment} from "../../services/api";
import {useParams} from "react-router-dom";

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
                console.log(data[0].contentComment)
                setComment(data[0]);
            })
            .catch(error => console.error("Error: ", error));
    }, []);

    // console.log(comment)
    return (
        <>
        <h1>opa eae meu velhote {commentId} {comment.userEmail} </h1>
        </>
    )
}

export default SingleThread
