import React, { useState } from 'react';
import './CreateBio.css';
import Modal from '../Modal/Modal'
import {ModalProps} from "react-bootstrap";
import {postBio} from "../../services/api";

const CreateBio: React.FC<ModalProps> = ({userId, token}) => {
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
        postBio(userId, bio, token)
        window.location.reload()
        //TODO: a api já retorna a bio, só preciso atualizar no componente profile.
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
