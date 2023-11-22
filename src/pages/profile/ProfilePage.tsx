import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import TopBar from '../../components/topBar/TopBar'
import axios from "axios";
import CreateBio from "../../components/CreateBio/CreateBio";
import ProfileNavBar from "../../components/ProfileNavBar/ProfileNavBar";
import ProfileCreateStories from "../../components/ProfileCreatedStories/ProfileCreateStories";
import UserVotes from "../../components/UserVotes/UserVotes";
import UserInfo from "../../components/UserInfo/UserInfo";

interface ProfilePageProps {
  name: string
  profilePicture: string
}

interface Story {
  title: string
  content: string
  art: string
  upvotes: number
  downvotes: number
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, profilePicture }) => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetchStories()
  }, [])

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
    // Fetch user data
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/user/info`, config)
          .then((response) => {
            setUserData(response.data);
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/user/bio/${response.data.id}`, config)
                .then((bioResponse) => {
                  setUserBio(bioResponse.data);
                })
                .catch((error) => {
                  console.error('Error fetching user bio', error);
                });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    }
  }, [token]);
  const fetchStories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/story/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }

      const storiesData = await response.json()
      setStories(storiesData)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  const [activeOption, setActiveOption] = useState('stories');

  return (
    <>
      <TopBar />
      <UserInfo personalPage={true} userInfoData={userData} userBio={userBio} token={token}/>
        <ProfileNavBar setActiveOption={setActiveOption} />
        {activeOption === 'stories' && <ProfileCreateStories stories={stories} />}
        {activeOption === 'votes' && <UserVotes userId={Number(userData.id)} />}
    </>
  )
}

export default ProfilePage
