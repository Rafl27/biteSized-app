import React from 'react';
import TopBar from "../../components/topBar/TopBar";
import './LearnMore.css'

const LearnMore = () => {
    return (
        <div>
            <TopBar />
            <h1 className="titles">How does BiteSized work?</h1>
            <p className="paragraphs">So, you know how life gets busy and you don’t have as much time to dive into epic fantasy like you used to? That’s where this platform comes in. It’s all about getting your fantasy fix in bite-sized pieces (yep, that’s why we call it what we do!).
                When I started building this thing, I had a lightbulb moment. What if everyone could chip in and weave stories together? No more groaning at bad endings or plot holes, 'cause you or anyone else could step in and fix it. Cool, right? That’s what we’re all about here.</p>

            <h3 className="titles">How do I create my first story?</h3>
            <p className="paragraphs">
                Ready to start weaving your own tale? Just hit that plus sign in the top bar.
            </p>
            <img className="example-images" src={"plus-button-arrpw.png"}/>
            <p className="paragraphs">This will take you to a pretty rad page where you can fill in all the details for your story. And guess what? Everything you type in gets updated on the right side of the screen in real-time.
                But here’s the catch - we’re currently not set up to accept image uploads directly from your device. So, you’ll need to upload your image somewhere else first and then drop us the URL. It’s a bit of a roundabout way, I know. But hey, we’re a nonprofit platform at the moment, so we appreciate your understanding!</p>
            <img className="example-images" src="create-story.png"/>
            <h3 className="titles">How do threads work?</h3>
            <p className="paragraphs">BiteSized is a cool place where you can let your creativity run wild, creating and collaborating on stories. Whether you’re a wordsmith who loves to spin tales in paragraphs or an artist who expresses themselves through artwork, there’s a space for you here.
                On our platform, we’ve got this thing called ‘threads’. Why, you ask? Well, one of the big ideas behind BiteSized is that stories crafted by a community can branch out in countless directions, leading to endless possible endings. So, each thread can weave its own unique tale, with multiple independent endings. It’s like every story is a tapestry with infinite patterns. Pretty awesome, right?</p>
            <img className="example-images" src={"threads-example.png"}/>
            <h3 className="titles">What about my reputation?</h3>
            <p className="paragraphs">Alright, here’s where I reel you in! If you click on your avatar up there in the top bar, you’ll get a neat overview of your BiteSized journey. You’ll see all the stories you’ve spun, the number of followers you’ve gathered, and the folks you’re following.
                But wait, there’s more! You can also check out everything you’ve given a thumbs up to. And to keep things transparent, we show you the number of upvotes and downvotes you’ve received - that’s your rep in the BiteSized community. So, go ahead and explore!</p>
            <img className="example-images" src={"profile-page.png"}/>
        </div>
    );
};

export default LearnMore;