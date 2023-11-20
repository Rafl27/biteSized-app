import './AlertModal.css'

import React, {MouseEventHandler} from 'react';
const AlertModal = ({message, onClose} : {message : string, onClose : MouseEventHandler}) => {
    return (
        <div className='modalT'>
            <div className='modal-content'>
                <h2 className="modal-title">{message}</h2>
                <div className="button-container">
                    <button className="modal-button close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;