import React from 'react'
import StoryCard from '../components/Stories/StoryCard'
const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <StoryCard />
    </div>
  )
}

export default Home
