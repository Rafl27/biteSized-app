import axios from "axios";
import React from "react";
import {StoryCard as Story} from "../interfaces/StoryCard";

const API_BASE_URL = 'http://localhost:8080';

export const fetchCommentsByStoryId = async (storyId : number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comment/${storyId}/allcomments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};

export const fetchUserData = async (storyId : number) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/user/info/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Error fetching user data:', error);
        return [];
    }
}

export const fetchStory = async (storyId : number) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/story/${storyId}`)
        return response.data
    }catch (error){
        console.error('Error fetching stories', error)
        return []
    }
}

export const fetchStories = async () => {
    try {
        const response = await axios.get<Story[]>(`${API_BASE_URL}/story/all`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const upvoteStory = async (storyId: number, authToken: string) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/story/${storyId}/upvote`,
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
            `${API_BASE_URL}/story/${storyId}/downvote`,
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
        const response = await axios.put(`${API_BASE_URL}/comment/${commentId}/upvote`,
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
        const response = await axios.put(`${API_BASE_URL}/comment/${commentId}/downvote`,
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