export interface Comment {
    idComment: number;
    contentComment: string;
    artComment: string;
    dateComment: string;
    upvotesComment: number;
    downvotesComment: number;
    useridComment: number;
    parentCommentId: number | null;
    userProfilePic: string,
    userUsername: string,
    userEmail: string
    replies?: Comment[]
}
