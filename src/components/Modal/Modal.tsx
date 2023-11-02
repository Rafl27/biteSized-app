import React, { useState } from 'react';
import './Modal.css'

interface ModalProps {
    initialText: string;
    onClose: () => void;
    onSave: (bio: string) => void;
    modalTitle : string
    rows : number
}

const Modal: React.FC<ModalProps> = ({ initialText, onClose, onSave, modalTitle , rows}) => {
    const [text, setText] = useState(initialText);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        onSave(text);
    };

    return (
        <div className='modalT'>
            <div className='modal-content'>
                <h2 className="modal-title">{modalTitle}</h2>
                <textarea rows={rows} className="modal-input" value={text} onChange={handleChange} />
                <div className="button-container">
                    <button className="modal-button save-button" onClick={handleSave}>Save</button>
                    <button className="modal-button close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
