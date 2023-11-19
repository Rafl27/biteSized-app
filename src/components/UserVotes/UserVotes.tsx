import React, {useEffect, useState} from 'react';
import './UserVotes.css'
import {UserVotesPar} from "../../interfaces/UserVotesPar";
import {fetchAllUserVotes} from "../../services/api";

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

                <div>
                    {userVotesData.map((vote, index) => (
                        <div key={index}>
                            <h1 className="vote-type">{vote.vote_type}</h1>
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