import React from 'react';
import TopBar from "../../components/topBar/TopBar";
import './LearnMore.css'

const LearnMore = () => {
    return (
        <div>
            <TopBar />
            <h1 className="titles">How does BiteSized Work?</h1>

            <h3 className="titles">How do threads work?</h3>
            <p className="paragraphs">BiteSized is a platform where you can create and colaborate in stories, be it with paragraphs or your artwork, in this platform, we call replies to stories threads, the reason why? Thats because one of the premisses of the platform, creating stories with a community, means such stories can have infinite endings, so each thread can have multiple independent endings.</p>

            <img className="example-images" src={"threads-example.png"}/>
            <p className="paragraphs">If you click on the reply button, a modal will open pronpiting you to add a paragraph, if you want, an image, everything will be displayed on the right just the way it will be in the platform,</p>
            <img className="example-images" src={"reply-modal.png"} />
        </div>
    );
};

export default LearnMore;