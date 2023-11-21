import React, {useEffect, useState} from 'react';
import TopBar from "../../components/topBar/TopBar";
import {useParams} from "react-router-dom";
import axios from "axios";

const VIsitProfile = () => {

    const {userId} = useParams()

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        profilePicture: '',
        id: ''
    });

    const [userBio, setUserBio] = useState({
        bio : ''
    })

    useEffect(() => {
        if(userId){
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}/info-visit-profile`)
                .then((response) => {
                    setUserData(response.data)
                })
        }
    }, [userId]);

    return (
        <>
            <TopBar />
            <div className="visit-profile-page">
                <div className="profile-picture">
                    <img src={userData.profilePicture} alt="Profile" />
                </div>
            </div>
        </>
    );
};

export default VIsitProfile;