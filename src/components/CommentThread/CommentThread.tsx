import React from "react";

const CommentThread = ({ comment }) => {
    return (
        <div className="comment">
            <div className="userInfo">
                <img src={comment.userProfilePic} alt="User Profile" />
                <span>{comment.userUsername}</span>
                <span>{comment.dateComment}</span>
            </div>
            <img src={comment.artComment} alt="Comment Art" />
            <div className="comment-content">{comment.contentComment}</div>

            {/* Render replies */}
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