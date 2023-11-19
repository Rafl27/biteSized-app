import './ProfileCreateStories.css'

import React from 'react';
import {Story} from "../../interfaces";
import {Link} from "react-router-dom";

interface ProfileCreateStoriesProps {
    stories: Story[];
}

const ProfileCreateStories : React.FC<ProfileCreateStoriesProps> = ({stories}) => {
    return (
        <>
            {stories.length === 0 ? (
                <>
                    <div className='no-story-messages'>
                        <h1>You haven't created any stories yet 🫵🏻</h1>
                        <h2>Let's Begin Your Storytelling Journey</h2>
                        <Link to={`/create`} className="btn btn-secondary">
                            Create a story clicking here
                        </Link>
                    </div>
                </>
            ) : (
                <div className="story-list">
                    {stories.map((story) => (
                        <div className="story" key={story.title}>
                            <h3>{story.title}</h3>
                            <img src={story.art} alt={story.title} className="card-img-top" />
                            <p className="story-text">{story.content}</p>
                            <p>Upvotes: {story.upvotes}</p>
                            <p>Downvotes: {story.downvotes}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProfileCreateStories;