import CommentThread from "../CommentThread/CommentThread";
import React from "react";

const CommentsList = ({ comments }) => {
    return (
        <div className="comments-list">
            {comments.map(comment => (
                <CommentThread key={comment.idComment} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsList