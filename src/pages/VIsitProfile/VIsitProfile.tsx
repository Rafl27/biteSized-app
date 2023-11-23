import React, {useEffect, useState} from 'react';
import TopBar from "../../components/topBar/TopBar";
import {useParams} from "react-router-dom";
import axios from "axios";
import ProfileNavBar from "../../components/ProfileNavBar/ProfileNavBar";
import ProfileCreateStories from "../../components/ProfileCreatedStories/ProfileCreateStories";
import UserVotes from "../../components/UserVotes/UserVotes";
import {Story} from "../../interfaces";
import CreateBio from "../../components/CreateBio/CreateBio";
import './VIsitProfile.css'
import UserInfo from "../../components/UserInfo/UserInfo";
import {checkFollowing, checkFollowingLogged} from "../../services/api";

const VIsitProfile = () => {

    const {userId} = useParams()

    const token = localStorage.getItem('token');

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
                    axios
                        .get(`${import.meta.env.VITE_API_BASE_URL}/user/bio/${response.data.id}`)
                        .then((bioResponse) => {
                            setUserBio(bioResponse.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching user bio', error);
                        });
                })
        }
    }, [userId]);

    useEffect(() => {
        fetchStories()
    }, [])


    const [stories, setStories] = useState<Story[]>([])
    const [storiesCount, setStoriesCount] = useState<number>(0)
    const [followedUsers, setFollowedUsers] = useState()

    // const fetchFollowedUsers = async () => {
    //     try{
    //         const response = await checkFollowingLogged(token)
    //             .then(data => {
    //                 setFollowedUsers(data)
    //             })
    //             .catch(error => console.log("Error", error))
    //     }
    // }

    useEffect(() => {
        checkFollowingLogged(token)
            .then(data => {
                setFollowedUsers(data)
                console.log("oiiii")
                console.log(data)
            }).catch(error => console.error("Error", error))
    }, [token]);

    const fetchStories = async () => {
        try {
            const response = await fetch (
                `${import.meta.env.VITE_API_BASE_URL}/story/${userId}/visit`
            )
            if (!response.ok){
                throw new Error("Failed to fetch stories")
            }
            const storiesData = await response.json()
            setStoriesCount(storiesData.storyCount)
            setStories(storiesData.stories)
        }catch (error) {
            console.log('Error fetching stories', error)
        }
    }



    const [activeOption, setActiveOption] = useState('stories');

    return (
        <>
            <TopBar />
                <UserInfo personalPage={false} userInfoData={userData} userBio={userBio} token={token} storyCount={storiesCount}/>
            <div className="navBar-fix">
                <ProfileNavBar setActiveOption={setActiveOption} />
            </div>
                {activeOption === 'stories' && <ProfileCreateStories stories={stories} />}
                {activeOption === 'votes' && <UserVotes userId={Number(userData.id)} />}
        </>
    );
};

export default VIsitProfile;