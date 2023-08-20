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