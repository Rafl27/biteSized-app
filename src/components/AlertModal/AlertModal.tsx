import './AlertModal.css'

import React from 'react';
const AlertModal = ({message} : {message : string}) => {
    return (
        <div className='modalT'>
            <div className='modal-content'>
                <h2 className="modal-title">{message}</h2>
                <div className="button-container">
                    <button className="modal-button close-button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;