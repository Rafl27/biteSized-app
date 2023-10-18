import './404.css'
import { MdCookie } from 'react-icons/md'
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
        <MdCookie className="cookie-icon" />
      <h1 className="heading">404 Not Found</h1>
      <p className="paragraph">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;