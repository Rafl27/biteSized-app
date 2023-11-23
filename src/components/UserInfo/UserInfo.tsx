import "./UserInfo.css"

import React, {useEffect, useState} from 'react';
import CreateBio from "../CreateBio/CreateBio";
import {UserBio} from "../../interfaces/UserBio";
import {UserInfoData} from "../../interfaces/UserInfoData";
import {fetchFollowerCount, fetchFollowingCount, followUser} from "../../services/api";

const UserInfo = ({personalPage, userInfoData, userBio, token, storyCount} : {personalPage : boolean, userInfoData : UserInfoData, userBio : UserBio, token? : String, storyCount : number}) => {
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [followingCount, setFollowingCount] = useState<number>(0)

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
                                <button className="follow-button" onClick={() => {followUser(userInfoData.id, token)
                                console.log(token)
                                }}>Follow</button>
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