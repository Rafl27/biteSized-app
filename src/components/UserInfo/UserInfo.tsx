import "./UserInfo.css"

import React from 'react';
import CreateBio from "../CreateBio/CreateBio";
import {UserBio} from "../../interfaces/UserBio";
import {UserInfoData} from "../../interfaces/UserInfoData";

const UserInfo = ({personalPage, userInfoData, userBio, token} : {personalPage : boolean, userInfoData : UserInfoData, userBio : UserBio, token? : String}) => {
    return (
        <>
            <p>{userBio.bio}</p>
            <div className="profile-page">
                <div className="profile-picture">
                    <img src={userInfoData.profilePicture} alt="Profile" />
                </div>
                <h2>{userInfoData.username}</h2>
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
        </>
    );
};

export default UserInfo;