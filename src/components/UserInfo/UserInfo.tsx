import "./UserInfo.css"

import React, {useEffect, useState} from 'react';
import CreateBio from "../CreateBio/CreateBio";
import {UserBio} from "../../interfaces/UserBio";
import {UserInfoData} from "../../interfaces/UserInfoData";
import {fetchFollowerCount, fetchFollowingCount, followUser, unfollowUser} from "../../services/api";

const UserInfo = ({personalPage, userInfoData, userBio, token, storyCount, followingList, visitedUser} : {personalPage : boolean, userInfoData : UserInfoData, userBio : UserBio, token? : String, storyCount : number, followingList? : [], visitedUser : number}) => {
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [followingCount, setFollowingCount] = useState<number>(0)
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

    const followUserHandler = async () => {
        try {
            const response = await followUser(userInfoData.id, token);
            if (response) {
                setButtonText('Following');
            }
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
                        <div className="name-follow">
                            <h2 className="username">{userInfoData.username}</h2>
                            {/*todo tratar o caso do mesmo user visitar o proprio perfil*/}
                            {personalPage ? (
                                    <p></p>
                            ) : (
                                alreadyFollowsUser() ? (
                                    <button className="follow-button" onClick={unfollowUserHandler}>
                                        {buttonText}
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
                                <CreateBio userId={userInfoData.id} token={token}  />
                            )
                        ) : (
                            userBio.bio &&
                            <p className="bio">{userBio.bio}</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;