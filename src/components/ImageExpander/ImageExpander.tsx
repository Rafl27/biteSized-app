import React, { useState } from 'react';
import './ImageExpander.css'; // You can put the CSS for the expanded image here or import the one from the main component

const ImageExpander = ({ src, alt }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isExpanded && (
                <div className="overlay" onClick={toggleExpand}>
                    <img className="expandedImage" src={src} alt={alt} />
                </div>
            )}
            <img
                className="commentArt"
                src={src}
                alt={alt}
                onClick={toggleExpand}
            />
        </>
    );
};

export default ImageExpander;
