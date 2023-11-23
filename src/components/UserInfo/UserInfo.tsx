import "./UserInfo.css"

import React from 'react';
import CreateBio from "../CreateBio/CreateBio";
import {UserBio} from "../../interfaces/UserBio";
import {UserInfoData} from "../../interfaces/UserInfoData";

const UserInfo = ({personalPage, userInfoData, userBio, token} : {personalPage : boolean, userInfoData : UserInfoData, userBio : UserBio, token? : String}) => {
    return (
        <>
            <div className="profile-page">
                <div className="infos">
                    <div className="left-side">
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
                    <div className="right-side">
                        <div className="follows">
                            <p><b>4</b> stories</p>
                            <p><b>54</b> Followers</p>
                            <p><b>33</b> Following</p>
                        </div>
                        <button className="follow-button">Follow</button>
                    </div>
                </div>


            </div>
        </>
    );
};

export default UserInfo;