import axios from "axios";
import {StoryCard as Story} from "../interfaces/StoryCard";

export const fetchCommentsByStoryId = async (storyId : number) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/comment/${storyId}/allcomments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};

export const fetchUserData = async (storyId : number) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/info/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Error fetching user data:', error);
        return [];
    }
}

export const fetchStory = async (storyId : number) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Error fetching stories', error)
        return []
    }
}

export const fetchStories = async (page: number, pageSize: number) => {
    try {
        const response = await axios.get<Story[]>(
            `${import.meta.env.VITE_API_BASE_URL}/story/all?page=${page}&size=${pageSize}`
        );
        return {
            data: response.data.content,
            totalPages: response.data.totalPages, // Add this line to get total pages
        };
    } catch (err) {
        console.error(err);
    }
};

export const upvoteStory = async (storyId: number, authToken: string) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/story/${storyId}/upvote`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const downvoteStory = async (storyId: number, authToken: string) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/story/${storyId}/downvote`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const upvoteComment = async (commentId: number, authToken: string) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/comment/${commentId}/upvote`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
        return response.data
    }catch (e){
        console.log(e)
    }
}

export const downvoteComment = async (commentId: number, authToken: string) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/comment/${commentId}/downvote`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
        return response.data
    }catch (e){
        console.log(e)
    }
}

export const fetchSingleComment = async (commentId : number) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/comment/${commentId}/single-thread`)
        return response.data
    }catch(error) {
        console.error("Error fetching comment Data: ", error)
    }
}

export const postBio = async (userId : number, bio : string, token : string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/bio/${userId}`,
            {
                bio
            },
            config)
        console.log(response.data)
        return response.data
    }
    catch (error){
        console.log("Error creating bio", error)
    }
}

export const fetchRemainingThreadsCount = async (threadId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/comment/19/more-threads-count`
        )
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
