import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import Root from './routes/root'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  /*{
    path: "contacts/:contactId",
    element: <Contact />,
  },*/
  //adding a new route ☝️
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
