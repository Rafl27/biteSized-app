import React from "react";
import './CommentThread.css'
import {RiChat3Line} from "react-icons/ri";
import {ImArrowDown, ImArrowUp} from "react-icons/im";

const CommentThread = ({ comment }) => {
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
                    <button className='vote-button upvote'> <ImArrowUp /> </button>
                    <button className='vote-button downvote'> <ImArrowDown /> </button>
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