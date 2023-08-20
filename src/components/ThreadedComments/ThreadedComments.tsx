import CommentsList from "../CommentsList/CommentsList";
import React from "react";

const ThreadedComments = ({ comments }) => {
    const generateCommentTree = (comments, parentCommentId = null) => {
        const commentTree = [];
        for (const comment of comments) {
            if (comment.parentCommentId === parentCommentId) {
                const replies = generateCommentTree(comments, comment.idComment);
                commentTree.push({
                    ...comment,
                    replies,
                });
            }
        }
        return commentTree;
    };
    const commentTree = generateCommentTree(comments);

    return (
        <div className="threaded-comments">
            <CommentsList comments={commentTree} />
        </div>
    );
}

export default ThreadedComments