import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './BackButton.css'
export default function BackButton() {

    const handleClick = () => {
        window.history.back();
    };

    return (
    <button onClick={handleClick} className='back-btn'>
        <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    )
}
