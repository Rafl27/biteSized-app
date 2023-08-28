import React, {useState} from "react";
import './CommentThread.css'
import {RiChat3Line} from "react-icons/ri";
import {ImArrowDown, ImArrowUp} from "react-icons/im";
import {upvoteStory, upvoteComment} from "../../services/api";

const CommentThread = ({ comment }) => {
    const token : string = localStorage.getItem('token')
    const handleUpvote = async (commentId: number) => {
        try {
            const updatedComment = await upvoteComment(commentId, token);
            comment.upvotes = updatedComment.upvote
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="comment">
            <div className="userInfo">
                <img src={comment.userProfilePic} alt="User Profile" />
                <span>{comment.userUsername}</span>
            </div>
            {comment.artComment !== "" && (
                <img className="commentArt" src={comment.artComment} alt="Comment Art" />
            )}
            <div className="comment-content">{comment.contentComment}</div>
            <div className="button-container">
                <button className="replyButton">
                    <RiChat3Line className="chatIcon" />
                    Reply
                </button>
                <div className="vote-container">
                    <button className='vote-button upvote' onClick={() => handleUpvote(comment.idComment)}> <ImArrowUp /> <p>{comment.upvotesComment}</p> </button>
                    <button className='vote-button downvote'> <ImArrowDown /> <p>{comment.downvotesComment}</p> </button>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                    {comment.replies.map(reply => (
                        <CommentThread key={reply.idComment} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentThread