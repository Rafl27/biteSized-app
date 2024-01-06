import axios from "axios";
import {StoryCard as Story} from "../interfaces/StoryCard";
import {ca} from "date-fns/locale";

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

export const fetchStories = async (page: number, pageSize: number, filter: string) => {
    try {
        switch (filter) {
            case "Top":
                console.log("aqui tá no top")
        }
        const response = await axios.get<Story[]>(
            `${import.meta.env.VITE_API_BASE_URL}/story/all?page=${page}&size=${pageSize}`
        );
        return {
            data: response.data.content,
            totalPages: response.data.totalPages,
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
        throw new Error(e.response.data.message);
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
        throw new Error(e.response.data.message);
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
        throw new Error(e.response.data.message);
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
        throw new Error(e.response.data.message);
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
            `${import.meta.env.VITE_API_BASE_URL}/comment/${threadId}/more-threads-count`
        )
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchRemainingThreads = async (threadId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/comment/${threadId}/more-threads`
        )
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchAllUserVotes = async (userId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/comment-vote/${userId}/all`
        )
            return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchFollowerCount = async (userId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/followers/${userId}/follower-count`
        )
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

export const fetchFollowingCount = async (userId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/followers/${userId}/following-count`
        )
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

export const followUser = async (userId : number, token : string) => {
    const config = {
        headers : {Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/followers/${userId}/follow`,
            {},
            config
        )
        return response.data
    }catch (error){
        console.log("Error following user", error)
    }
}

export const unfollowUser = async (userId : number, token : string) => {
    const config = {
        headers : {Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/followers/${userId}/unfollow`,
            {},
            config
        )
        return response.data
    }catch (error){
        console.log("Error unfollowing user", error)
    }
}


export const checkFollowing = async (userId : number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/followers/${userId}/check-following`
        )
        return response.data
    }catch (error) {
        console.log("Error fetching following list", error)
    }
}

export const checkFollowingLogged = async (token : string) => {
    const config = {
        headers : {Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/followers/check-following-logged`,
            config
        )
        return response.data
    }catch(error){
        console.log("Error fetching follow list", error)
    }
}


