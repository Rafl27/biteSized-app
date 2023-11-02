import React, { useState } from 'react';
import './Modal.css'

interface ModalProps {
    initialText: string;
    onClose: () => void;
    onSave: (bio: string) => void;
    modalTitle : string
}

const Modal: React.FC<ModalProps> = ({ initialText, onClose, onSave, modalTitle }) => {
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
            <h2>{modalTitle}</h2>
            <input type="text" value={text} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
