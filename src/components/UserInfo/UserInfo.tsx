import "./UserInfo.css"

import React, {useEffect, useState} from 'react';
import CreateBio from "../CreateBio/CreateBio";
import {UserBio} from "../../interfaces/UserBio";
import {UserInfoData} from "../../interfaces/UserInfoData";
import {fetchFollowerCount, fetchFollowingCount, fetchVotesCount, followUser, unfollowUser} from "../../services/api";
import {ImArrowDown, ImArrowUp} from "react-icons/im";

const UserInfo = ({personalPage, userInfoData, userBio, token, storyCount, followingList, visitedUser} : {personalPage : boolean, userInfoData : UserInfoData, userBio : UserBio, token? : String, storyCount : number, followingList? : [], visitedUser : number}) => {
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [followingCount, setFollowingCount] = useState<number>(0)
    const [upvotesCount, setUpvotesCount] = useState<number>(0)
    const [downvotesCount, setDownvotesCount] = useState<number>(0)
    const [buttonText, setButtonText] = useState('Follow');

    useEffect(() => {
        fetchFollowerCount(userInfoData.id)
            .then(data => {
                setFollowerCount(data.following);
            })
            .catch(error => console.error("Error", error));
    }, [userInfoData]);

    useEffect(() => {
        fetchFollowingCount(userInfoData.id)
            .then(data => {
                setFollowingCount(data.following)
            })
            .catch(error => console.error("Error", error))
    }, [userInfoData]);
    useEffect(() => {
        fetchVotesCount(userInfoData.id)
            .then(data => {
                setUpvotesCount(data.upvotes)
                setDownvotesCount(data.downvotes)
            })
            .catch(error => console.error("Error", error))
    }, [userInfoData]);

    const followUserHandler = async () => {
        try {
            if (!token) {
                window.location.href = '/auth';
                return;
            }
            const response = await followUser(userInfoData.id, token);
            if (response) {
                setButtonText('Following');
            }
            window.location.reload()
        } catch (error) {
            console.log('Error following user', error);
        }
    };

    const unfollowUserHandler = async () => {
        try {
            const response = await unfollowUser(userInfoData.id, token);
            if (response) {
                setButtonText('Follow');
            }
            window.location.reload()
        } catch (error) {
            console.log('Error following user', error);
        }
    };

    const alreadyFollowsUser = () => {
        if(followingList){
            return followingList.some(follow => follow.main_user == visitedUser)
        }
    }


    return (
        <>
            <div className="profile-page">
                <div className="infos">
                    <div className="left-side">
                        <div className="profile-picture">
                            <img src={userInfoData.profilePicture} alt="Profile" />
                        </div>

                    </div>
                    <div className="right-side">
                        <div className="follows">
                            {storyCount ? (
                                <p><b>{storyCount}</b> stories</p>
                            ) : (
                                <p><b>0</b> stories</p>
                            )}

                            {followerCount ? (
                                <p><b>{followerCount}</b> Followers</p>
                            ) :
                                (
                                    <p><b>0</b> Followers</p>
                                )}
                            {followingCount ? (
                                <p><b>{followingCount}</b> Following</p>
                            ) : (
                                <p><b>0</b> Following</p>
                            )
                            }
                        </div>
                        <div className="name-bio">
                            <div className="name-follow">
                                <h2 className="username">{userInfoData.username}</h2>
                                {/*todo tratar o caso do mesmo user visitar o proprio perfil*/}
                                {personalPage ? (
                                    <p></p>
                                ) : (
                                    alreadyFollowsUser() ? (
                                        <button className="follow-button" onClick={unfollowUserHandler}>
                                            Following
                                        </button>
                                    ) : (
                                        <button className="follow-button" onClick={followUserHandler}>
                                            {buttonText}
                                        </button>
                                    )
                                )}
                            </div>

                            {personalPage ? (
                                userBio.bio != '' ? (
                                    <p className="bio">{userBio.bio}</p>
                                ) : (
                                    <CreateBio userId={userInfoData.id} token={token}/>
                                )
                            ) : (
                                userBio.bio
                            )}
                            <div className="profile-container">
                                <p className="votes-container">
                                    Total Votes received
                                    <ImArrowUp className="vote-icon upvote"/> <span
                                    className="votes">{upvotesCount}</span>
                                    <ImArrowDown className="vote-icon downvote"/> <span
                                    className="downvotes">{downvotesCount}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
