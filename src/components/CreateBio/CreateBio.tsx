import React, { useState } from 'react';
import './CreateBio.css';
import Modal from '../Modal/Modal'

const CreateBio = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [userBio, setUserBio] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveBio = (bio: string) => {
        setUserBio(bio);
        setModalOpen(false);
    };

    return (
        <div>
            <button className="create-button" onClick={handleOpenModal}>Create User Bio</button>
            {modalOpen && (
                <Modal
                    onClose={handleCloseModal}
                    onSave={handleSaveBio}
                    initialText={userBio}
                    modalTitle={'User bio'}
                    rows={3}
                />
            )}
        </div>
    );
};

export default CreateBio;
