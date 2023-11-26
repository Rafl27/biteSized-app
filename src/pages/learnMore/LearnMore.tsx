import React from 'react';
import TopBar from "../../components/topBar/TopBar";
import './LearnMore.css'

const LearnMore = () => {
    return (
        <div>
            <TopBar />
            <h1 className="titles">How does BiteSized Work?</h1>
            <p className="paragraphs">Lets start with why is this platform called what it is, currently I dont have as much time as I had a few years ago to read epic fantasy, and I wanted a way to quickly get some of this content, in bite sizes (I just said the name of the platform ╰(*°▽°*)╯) when I started creating it, I came up with the idea, wouldnt it be awesome if people were able to create stories colaboratevily? That way you would never find a bad ending, or plot holes or anything of such kind, because you could fix it or someone else.</p>

            <h3 className="titles">How do threads work?</h3>
            <p className="paragraphs">BiteSized is a platform where you can create and colaborate in stories, be it with paragraphs or your artwork, in this platform, we call replies to stories threads, the reason why? Thats because one of the premisses of the platform, creating stories with a community, means such stories can have infinite endings, so each thread can have multiple independent endings.</p>

            <img className="example-images" src={"threads-example.png"}/>
            <p className="paragraphs">If you click on the reply button, a modal will open pronpiting you to add a paragraph, if you want, an image, everything will be displayed on the right just the way it will be in the platform,</p>
            <img className="example-images" src={"reply-modal.png"} />
        </div>
    );
};

export default LearnMore;