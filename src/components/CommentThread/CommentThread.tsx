import React, {useEffect, useState} from "react";
import './CommentThread.css';
import { RiChat3Line } from "react-icons/ri";
import { BsBookHalf } from "react-icons/bs";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import {MdUnfoldMore} from 'react-icons/md'
import {
    upvoteComment,
    downvoteComment,
    fetchRemainingThreadsCount,
} from "../../services/api";
import NewThread from "../../pages/NewThread/NewThread";
import { Link } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";


const CommentThread = ({ comment, depth = 0 }) => {
    const token = localStorage.getItem('token');
    const [upvotes, setUpvotes] = useState(comment.upvotesComment);
    const [downvotes, setDownvotes] = useState(comment.downvotesComment);
    const [showModal, setShowModal] = useState(false);
    const [showRemainingReplies, setShowRemainingReplies] = useState(false);
    const [remainingThreadsCount, setRemainingThreadsCount] = useState(0)

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleUpvote = async (commentId : number) => {
        try {
            if (!token) {
                window.location.href = '/auth';
                return;
            }
            const updatedComment = await upvoteComment(commentId, token);
            setUpvotes(updatedComment.upvote);
        } catch (err) {
            setModalOpen(true);
        }
    }

    const handleDownvote = async (commentId : number) => {
        try {
            if (!token) {
                window.location.href = '/auth';
                return;
            }
            const updatedComment = await downvoteComment(commentId, token);
            setDownvotes(updatedComment.downvote);
        } catch (err) {
            setModalOpen(true);
        }
    }

    useEffect(() => {
            fetchRemainingThreadsCount(comment.idComment)
                .then(data => {
                    setRemainingThreadsCount(data);
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
    }, [comment.id]);

    const toggleModal = () => {
        if (!token) {
            window.location.href = '/auth';
            return;
        }
        setShowModal((prevShowModal) => !prevShowModal);
    }

    const closeModal = (event) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    }
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const borderColors = ['#ccc', '#8a2c12', '#1b1bad', '#10590f', '#4a1275'];

    return (
        <div className="comment">
            {modalOpen && (
                <AlertModal message={"You've already voted on this thread"} onClose={handleCloseModal} />
            )}

            <div className="userInfo">
                <Link to={`/visit-profile/${comment.useridComment}`}>
                <img src={comment.userProfilePic} alt="User Profile" />
                <span>{comment.userUsername}</span>
                </Link>
            </div>
            <div className="art-comment">
                {comment.artComment !== "" && (
                    <>
                        {isExpanded && (
                            <div className="overlay" onClick={toggleExpand}>
                                <img className="expandedImage" src={comment.artComment} alt="Expanded Comment Art" />
                            </div>
                        )}
                        <img
                            className="commentArt"
                            src={comment.artComment}
                            alt="Comment Art"
                            onClick={toggleExpand}
                        />
                    </>
                )}
                <div className="comment-content">{comment.contentComment}</div>
            </div>
            <div className="button-container">
                <div className="reply-continue">
                    <Link to={`/comment/${comment.idComment}/single-thread`} className="btn btn-secondary button-continue">
                        <BsBookHalf /> Continue reading
                    </Link>
                    <button className="btn btn-secondary button-continue" onClick={toggleModal}>
                        <RiChat3Line className="chatIcon" />
                        Reply
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
                        <Link to={`/thread/${comment.idComment}`} className="btn btn-secondary button-continue">
                            <MdUnfoldMore /> Open {remainingThreadsCount} remaining thread(s)
                        </Link>
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
