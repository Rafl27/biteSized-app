import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {formatDate} from "../../../utils/dateUtils";
import './StoryCard.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import {StoryCard as Story} from "../../../interfaces/StoryCard";
import {downvoteStory, fetchStories, upvoteStory} from "../../../services/api";

const StoryCard: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([])
    const token : string = localStorage.getItem('token')
    const [upvoteClicked, setUpvoteClicked] = useState<number[]>([])
    const [downvoteClicked, setDownvoteClicked] = useState<number[]>([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchStories(page, pageSize)
        .then((data) => {
            setStories(data.data)
            setTotalPages(data.totalPages)
        })
        .catch(error => console.log('Error', error))
  }, [page, pageSize])

  const handleUpvote = async (storyId: number) => {
    try {
      const updatedStory = await upvoteStory(storyId, token);
      setStories((prevStories) =>
          prevStories.map((story) =>
              story.storyId === updatedStory.id
                  ? { ...story, upvotes: updatedStory.upvote }
                  : story
          )
      );
      setUpvoteClicked((prevClicked) => [...prevClicked, storyId]);
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownvote = async (storyId: number) => {
      try {
          const updatedStory = await downvoteStory(storyId, token)
          setStories((prevStories) =>
              prevStories.map((story) =>
                  story.storyId === updatedStory.id
                      ? { ...story, downvotes: updatedStory.downvote }
                      : story
              )
          );
          setDownvoteClicked((prevClicked) => [...prevClicked, storyId]);
      } catch (err) {
          console.error(err)
      }
  }
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize)
    };

    type BorderColor = {
        borderColor: string;
        className: string;
    };

    const getUpvoteColor = (upvotes : number) : BorderColor | undefined => {
        if (upvotes >= 10000) {
            return { borderColor: '#d9173a', className: 'card animateHighUpvotes' };
        } else if (upvotes >= 5000) {
            return { borderColor: '#00cc00', className: 'card' };
        } else if (upvotes >= 1000) {
            return { borderColor: 'yellow', className: 'card' };
        } else if (upvotes >= 500) {
            return { borderColor: '#33cc33', className: 'card' };
        } else {
            return { borderColor: 'white', className: 'card' };
        }
    };

  return (
    <>
        <div className="column">
            {stories.slice(0, Math.ceil(stories.length / 2)).map((story) => (
                <div
                    key={story.storyId}
                    className={getUpvoteColor(story.upvotes).className}
                    style={{
                        flex: '0 0 48%',
                        margin: '1%',
                        borderColor: getUpvoteColor(story.upvotes),
                    }}
                >
                    <div className="card-body" style={{ flex: '1 1 auto' }}>
                        <img
                            src={story.art}
                            alt={story.title}
                            className="card-img-top"
                        />
                        <p className="created">Created: {formatDate(story.date)}</p>
                        <div className="userInfo">
                            <img
                                className="profilePicture"
                                src={story.profile_picture}
                                alt="user profile picture"
                            />
                            <p className="userName">{story.username}</p>
                        </div>
                        <div className="card-title-container">
                            <h3 className="card-title">{story.title}</h3>
                            <div className="vote-container">
                                <button
                                    className={`vote-button upvote ${
                                        upvoteClicked.includes(story.storyId) ? 'clicked' : ''
                                    }`}
                                    onClick={() => handleUpvote(story.storyId)}
                                    disabled={
                                        upvoteClicked.includes(story.storyId) ||
                                        downvoteClicked.includes(story.storyId)
                                    }
                                >
                                    {story.upvotes}
                                    <ImArrowUp />
                                </button>
                                <button
                                    className={`vote-button downvote ${
                                        downvoteClicked.includes(story.storyId) ? 'clicked' : ''
                                    }`}
                                    onClick={() => handleDownvote(story.storyId)}
                                    disabled={
                                        downvoteClicked.includes(story.storyId) ||
                                        upvoteClicked.includes(story.storyId)
                                    }
                                >
                                    {story.downvotes}
                                    <ImArrowDown />
                                </button>
                            </div>
                        </div>
                        <p className="card-text">{story.content}</p>
                        <Link to={`/story/${story.storyId}`} className="btn btn-secondary">
                            Continue reading
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        <div className="column">
            {stories.slice(Math.ceil(stories.length / 2)).map((story) => (
                <div
                    key={story.storyId}
                    className={getUpvoteColor(story.upvotes).className}
                    style={{
                        flex: '0 0 48%',
                        margin: '1%',
                        borderColor: getUpvoteColor(story.upvotes),
                    }}
                >
                    <div className="card-body" style={{ flex: '1 1 auto' }}>
                        <img
                            src={story.art}
                            alt={story.title}
                            className="card-img-top"
                        />
                        <p className="created">Created: {formatDate(story.date)}</p>
                        <div className="userInfo">
                            <img
                                className="profilePicture"
                                src={story.profile_picture}
                                alt="user profile picture"
                            />
                            <p className="userName">{story.username}</p>
                        </div>
                        <div className="card-title-container">
                            <h3 className="card-title">{story.title}</h3>
                            <div className="vote-container">
                                <button
                                    className={`vote-button upvote ${
                                        upvoteClicked.includes(story.storyId) ? 'clicked' : ''
                                    }`}
                                    onClick={() => handleUpvote(story.storyId)}
                                    disabled={
                                        upvoteClicked.includes(story.storyId) ||
                                        downvoteClicked.includes(story.storyId)
                                    }
                                >
                                    {story.upvotes}
                                    <ImArrowUp />
                                </button>
                                <button
                                    className={`vote-button downvote ${
                                        downvoteClicked.includes(story.storyId) ? 'clicked' : ''
                                    }`}
                                    onClick={() => handleDownvote(story.storyId)}
                                    disabled={
                                        downvoteClicked.includes(story.storyId) ||
                                        upvoteClicked.includes(story.storyId)
                                    }
                                >
                                    {story.downvotes}
                                    <ImArrowDown />
                                </button>
                            </div>
                        </div>
                        <p className="card-text">{story.content}</p>
                        <Link to={`/story/${story.storyId}`} className="btn btn-secondary">
                            Continue reading
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        <div className="pagination">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
            >
                Previous
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1}
            >
                Next
            </button>
        </div>
    </>
  )
}
export default StoryCard
