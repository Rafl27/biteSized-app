import React, {useEffect, useState} from 'react';
import './UserVotes.css'
import {UserVotesPar} from "../../interfaces/UserVotesPar";
import {fetchAllUserVotes} from "../../services/api";
import {BsBookHalf} from "react-icons/bs";
import {Link} from "react-router-dom";

interface UserVotesProps{
    userId : number
}

const UserVotes : React.FC<UserVotesProps>= ({userId}) => {

    const [userVotesData, setUserVotesData] = useState<UserVotesPar[]>([])

    useEffect(() => {
        fetchAllUserVotes(userId)
            .then(data => {setUserVotesData(data)
            console.log(data)})
            .catch(error => console.log("Error", error))
    }, [userId]);

    return (
        <>
            {userVotesData.length > 0 ? (

                <div className="vote-list">
                    {userVotesData.map((vote, index) => (
                        <div className="vote-card" key={index}>
                            <p className={vote.vote_type === 'UPVOTE' ? 'vote_type_upvote' : 'vote_type_downvote'}>{vote.vote_type}</p>
                            {vote.art && (
                                <img className="vote-art" src={vote.art} alt="Vote Art" />
                            )}
                            <div className="vote-content">
                                <p className="vote-text">{vote.content}</p>
                            </div>
                            <Link to={`/story/${vote.story_id}`} className="btn btn-secondary button-continue">
                                <BsBookHalf /> Complete Story
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No user votes data available</p>
            )}
            {/*<p>oi</p>*/}
        </>
    );
};

export default UserVotes;