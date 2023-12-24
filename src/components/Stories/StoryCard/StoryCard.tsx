import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {formatDate} from "../../../utils/dateUtils";
import './StoryCard.css'
import {ImArrowUp, ImArrowDown} from 'react-icons/im'
import {StoryCard as Story} from "../../../interfaces/StoryCard";
import {FaComments} from "react-icons/fa"
import { MdOutlineWhatshot, MdOutlineNewReleases, MdOutlineVerticalAlignTop  } from "react-icons/md";
import {downvoteStory, fetchStories, upvoteStory} from "../../../services/api";
import {compacNumbers} from "../../../utils/compacNumbers";
import AlertModal from "../../AlertModal/AlertModal";

const StoryCard: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([])
    const token: string = localStorage.getItem('token')
    const [upvoteClicked, setUpvoteClicked] = useState<number[]>([])
    const [downvoteClicked, setDownvoteClicked] = useState<number[]>([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(0)
    const [totalComments, setTotalComments] = useState({});

    useEffect(() => {
        fetchStories(page, pageSize)
            .then((data) => {
                setStories(data.data)
                setTotalPages(data.totalPages)
            })
            .catch(error => console.log('Error', error))
    }, [page, pageSize])

    useEffect(() => {
        const fetchTotalComments = async () => {
            const totalCommentsCopy = {...totalComments};
            for (const story of stories) {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/story/${story.storyId}/total-comments`);
                const data = await response.json();
                totalCommentsCopy[story.storyId] = data[0].totalComments
            }
            setTotalComments(totalCommentsCopy);
        };

        fetchTotalComments();
    }, [stories]);


    const handleUpvote = async (storyId: number) => {

        try {
            if (!token) {
                window.location.href = '/auth';
                return;
            }
            const updatedStory = await upvoteStory(storyId, token);
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story.storyId === updatedStory.id
                        ? {...story, upvotes: updatedStory.upvote}
                        : story
                )
            );
            setUpvoteClicked((prevClicked) => [...prevClicked, storyId]);
        } catch (err) {
            setModalOpen(true);
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDownvote = async (storyId: number) => {
        try {
            if (!token) {
                window.location.href = '/auth';
                return;
            }
            const updatedStory = await downvoteStory(storyId, token)
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story.storyId === updatedStory.id
                        ? {...story, downvotes: updatedStory.downvote}
                        : story
                )
            );
            setDownvoteClicked((prevClicked) => [...prevClicked, storyId]);
        } catch (err) {
            setModalOpen(true);
        }
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize)
    };

    type BorderColor = {
        borderColor: string;
        className: string;
    };

    const getUpvoteColor = (upvotes: number): BorderColor | undefined => {
        if (upvotes >= 10000) {
            return {borderColor: '#d9173a', className: 'card animateHighUpvotes'};
        } else if (upvotes >= 5000) {
            return {borderColor: '#00cc00', className: 'card'};
        } else if (upvotes >= 1000) {
            return {borderColor: 'yellow', className: 'card'};
        } else if (upvotes >= 500) {
            return {borderColor: '#33cc33', className: 'card'};
        } else {
            return {borderColor: 'white', className: 'card'};
        }
    };

    return (
        <div className='cards'>
            {modalOpen && (
                <AlertModal message={"You've already voted on this story"} onClose={handleCloseModal} />
            )}
            <div className="stories-filter">
                <Link to="/get-started" style={{ textDecoration: 'none', color: 'white' }}>
                    <p className="filter-options"><MdOutlineVerticalAlignTop /> Top</p>
                </Link>
                <Link to="/get-started" style={{ textDecoration: 'none', color: 'white' }}>
                    <p className="filter-options"><MdOutlineNewReleases /> Newest</p>
                </Link>
                <Link to="/get-started" style={{ textDecoration: 'none', color: 'white' }}>
                    <p className="filter-options"> <MdOutlineWhatshot /> Hot</p>
                </Link>
            </div>
            <div className="card-container">
                {stories
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map((story) => (
                        <div
                            key={story.storyId}
                            className={getUpvoteColor(story.upvotes).className}
                            style={{
                                borderColor: getUpvoteColor(story.upvotes),
                            }}
                        >
                            <div className="card-body">
                                <h4 className="card-title">{story.title}</h4>
                                <img
                                    src={story.art}
                                    alt={story.title}
                                    className="card-img-top"
                                    style={{ maxWidth: '100%' }}
                                />
                                <p className="created">Created: {formatDate(story.date)}</p>


                                    <div className="userInfo">
                                        <img
                                            className="profilePicture"
                                            src={story.profile_picture}
                                            alt="user profile picture"
                                        />
                                        <div className="name-followers">
                                            <Link to={`/visit-profile/${story.userId}`}>
                                                <p className="userName">{story.username}</p>
                                            </Link>
                                            <p className="follower-count">
                                                <b>{story.followerCount}</b> follower(s)
                                            </p>
                                        </div>
                                    </div>

                                <p className="card-text">{story.content}</p>
                                <div className="card-title-container">
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
                                            <h2>{compacNumbers(story.upvotes)}</h2>
                                            <ImArrowUp/>
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
                                            <h2>{compacNumbers(story.downvotes)}</h2>
                                            <ImArrowDown/>
                                        </button>
                                        <div className="comment-container">

                                            <h2 id="total-comments">{totalComments[story.storyId]}</h2>
                                            <FaComments/>
                                        </div>
                                        {story.language === "EN" ? (
                                            <img className='languageIcon' src={'usa-flag.png'} alt="EN Icon"/>
                                        ) : story.language === "BR" ? (
                                            <img className='languageIcon' src={'brazil-flag.png'} alt="BR Icon"/>
                                        ) : null}

                                    </div>
                                </div>

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
        </div>
    )
}
export default StoryCard
