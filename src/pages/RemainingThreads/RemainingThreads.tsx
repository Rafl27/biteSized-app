import './RemainingThreads.css'
import TopBar from "../../components/topBar/TopBar";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ThreadedComments from "../../components/ThreadedComments/ThreadedComments";
import {fetchRemainingThreads} from "../../services/api";
import {RemainingThreadsInterface} from "../../interfaces/RemainingThreadsInterface";
import {Comment} from "../../interfaces/Comment";

const RemainingThreads = () => {

    const {idComment} = useParams()
    const [comments, setComments] = useState<RemainingThreadsInterface[]>([]);

    useEffect(() => {
        fetchRemainingThreads(idComment)
            .then(data => setComments(data))
            .catch(error => console.error('Error:', error));
    }, [idComment]);

    //The first comment is sliced out of the commment array because it will be shown on top
    const transformedComments: Comment[] = comments.slice(1).map((comment: RemainingThreadsInterface, index) => ({
        idComment: comment.commentId,
        contentComment: comment.content,
        artComment: comment.art || '',
        dateComment: comment.date,
        upvotesComment: comment.upvotes,
        downvotesComment: comment.downvotes,
        useridComment: comment.userId,
        //the first one is set to null because generateCommentTree must have the first commentParentId null to work with first level stories
        parentCommentId: index === 0 ? null : comment.parentId,
        userProfilePic: comment.profilePicture,
        userUsername: comment.username,
        userEmail: comment.email,
        replies: []
    }));

    return (
        <>
            <TopBar />
             {comments.length > 0 ? (
                 <div className="single-story-container">
                     <div className="header">
                         {comments[0].art && (
                             <img className="story-img" src={comments[0].art}
                                  alt={comments[0].commentId.toString()}
                             />
                         )}
                         <p>Published on:
                             {new Date(comments[0].date).toLocaleDateString()}
                         </p>
                         <p>
                             <img
                                 className="profilePicture"
                                 src={comments[0].profilePicture}
                                 alt="user profile picture"
                             />
                             {comments[0].username}
                         </p>
                     </div>
                     <div className="add-comment">
                         {/*<button className="add-comment-button"*/}
                         {/*        // onClick={toggleModal}*/}
                         {/*>*/}
                         {/*    New thread*/}
                         {/*</button>*/}
                         {/*{showModal && (*/}
                         {/*    <div className="modal-overlay" onClick={closeModal}>*/}
                         {/*        <div*/}
                         {/*            className="modal-content"*/}
                         {/*            onClick={(e) => e.stopPropagation()}*/}
                         {/*        >*/}
                         {/*            <button className="modal-close-button" onClick={toggleModal}>*/}
                         {/*                Close*/}
                         {/*            </button>*/}
                         {/*            <NewThread storyID={_id}/>*/}
                         {/*        </div>*/}
                         {/*    </div>*/}
                         {/*)}*/}
                     </div>
                     <div className="content">
                         <p>
                             {comments[0].content}
                         </p>
                     </div>
                     <h2 id='threadsh2'>Threads:</h2>
                     <ThreadedComments comments={transformedComments} />
                 </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )

};

export default RemainingThreads;
