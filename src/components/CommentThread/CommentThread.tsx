import React, { useState } from "react";
import './CommentThread.css';
import { RiChat3Line } from "react-icons/ri";
import { BsBookHalf } from "react-icons/bs";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { upvoteComment, downvoteComment } from "../../services/api";
import NewThread from "../../pages/NewThread/NewThread";
import { Link } from "react-router-dom";

const CommentThread = ({ comment, depth = 0 }) => {
    const token = localStorage.getItem('token');
    const [upvotes, setUpvotes] = useState(comment.upvotesComment);
    const [downvotes, setDownvotes] = useState(comment.downvotesComment);
    const [showModal, setShowModal] = useState(false);
    const [showRemainingReplies, setShowRemainingReplies] = useState(false);

    const handleUpvote = async (commentId) => {
        try {
            const updatedComment = await upvoteComment(commentId, token);
            setUpvotes(updatedComment.upvote);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDownvote = async (commentId) => {
        try {
            const updatedComment = await downvoteComment(commentId, token);
            setDownvotes(updatedComment.downvote);
        } catch (err) {
            console.error(err);
        }
    }

    const toggleModal = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    }

    const closeModal = (event) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    }

    const borderColors = ['#ccc', '#8a2c12', '#1b1bad', '#10590f', '#4a1275'];

    return (
        <div className="comment">
            <div className="userInfo">
                <img src={comment.userProfilePic} alt="User Profile" />
                <span>{comment.userUsername}</span>
            </div>
            <div className="art-comment">
                {comment.artComment !== "" && (
                    <img className="commentArt" src={comment.artComment} alt="Comment Art" />
                )}
                <div className="comment-content">{comment.contentComment}</div>
            </div>
            <div className="button-container">
                <div className="reply-continue">
                    <button className="replyButton" onClick={toggleModal}>
                        <RiChat3Line className="chatIcon" />
                        Reply
                    </button>
                    <Link to={`/comment/${comment.idComment}/single-thread`} className="btn btn-secondary button-continue">
                        <BsBookHalf /> Continue reading
                    </Link>
                    {showModal && (
                        <div className="modal-overlay" onClick={closeModal}>
                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="modal-close-button" onClick={toggleModal}>
                                    Close
                                </button>
                                <NewThread storyID={comment.idComment} useRepliesAPI={true} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="vote-container">
                    <button className='vote-button upvote' onClick={() => handleUpvote(comment.idComment)}> <ImArrowUp /> <p>{upvotes}</p> </button>
                    <button className='vote-button downvote' onClick={() => handleDownvote(comment.idComment)}> <ImArrowDown /> <p>{downvotes}</p> </button>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                    {depth === 2
                        ? (
                            <button onClick={() => setShowRemainingReplies(true)}>Open remaining threads</button>
                        )
                        : comment.replies.map((reply, index) => (
                            <div key={reply.idComment} className="reply" style={{ borderLeft: `1px solid ${borderColors[index % borderColors.length]}` }}>
                                <CommentThread comment={reply} depth={depth + 1} />
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default CommentThread;
