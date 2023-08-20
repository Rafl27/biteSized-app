import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

export const fetchCommentsByStoryId = async (storyId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comment/${storyId}/allcomments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};