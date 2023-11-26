import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/auth/SignUp'
import SingleStory from './pages/SingleStory/SingleStory'
import CreateStory from './pages/createStory/CreateStory'
import ProfilePage from './pages/profile/ProfilePage'
import NewThread from './pages/NewThread/NewThread'
import SingleThread from './pages/SingleThread/SingleThread'
import NotFoundPage from "./pages/404/404";
import RemainingThreads from "./pages/RemainingThreads/RemainingThreads";
import VIsitProfile from "./pages/VIsitProfile/VIsitProfile";
import LearnMore from "./pages/learnMore/LearnMore";

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <SignUp />,
  },
  {
    path: '/story/:_id',
    element: <SingleStory />,
  },
  {
    path: '/create',
    element: <CreateStory />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/visit-profile/:userId',
    element: <VIsitProfile />
  },
  {
    path: '/newthread',
    element: <NewThread />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/comment/:commentId/single-thread',
    element: <SingleThread/>
  },
  {
    path: '/thread/:idComment',
    element: <RemainingThreads />
  },
  {
    path: '/get-started',
    element: <LearnMore />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
