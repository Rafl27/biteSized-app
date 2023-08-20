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

export const fetchUserData = async (storyId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/user/info/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Error fetching user data:', error);
        return [];
    }
}

export const fetchStory = async (storyId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Erro fetching stories', error)
        return []
    }
}