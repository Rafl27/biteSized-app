import CommentThread from "../CommentThread/CommentThread";
import React from "react";
import './CommentsList.css'

const CommentsList = ({ comments, noStyle } : {comments : any, noStyle : boolean}) => {
    return (
        <div className= {noStyle ? "no-style" : "comments-list"}>
            {comments.map(comment => (
                <CommentThread key={comment.idComment} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsList