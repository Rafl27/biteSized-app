import './RemainingThreads.css'
import TopBar from "../../components/topBar/TopBar";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ThreadedComments from "../../components/ThreadedComments/ThreadedComments";
import {fetchRemainingThreads} from "../../services/api";
import {RemainingThreadsInterface} from "../../interfaces/RemainingThreadsInterface";

const RemainingThreads = () => {

    const {idComment} = useParams()
    const [comments, setComments] = useState<RemainingThreadsInterface[]>([]);

    useEffect(() => {
        fetchRemainingThreads(idComment)
            .then(data => setComments(data))
            .catch(error => console.error('Error:', error));
    }, [idComment]);

console.log(comments)




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
                     <ThreadedComments comments={comments} />
                 </div>
            ) : (
                <p>Loading...</p>
            )}

        </>
    )

};

export default RemainingThreads;
