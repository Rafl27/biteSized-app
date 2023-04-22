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

// const style = {
//   background: 'linear-gradient(to right, #f8b195, #f67280)',
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <div style={style}></div> */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
