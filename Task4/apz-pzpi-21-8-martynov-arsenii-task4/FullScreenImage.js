import React from 'react';
import './FullScreenImage.css';
import sadikImage from './sadik.jpg';

const FullScreenImage = () => {
    return (
        <div className="fullscreen-background" style={{ backgroundImage: `url(${sadikImage})` }} />
    );
}

export default FullScreenImage;
