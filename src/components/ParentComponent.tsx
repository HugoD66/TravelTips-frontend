import React, { useState } from 'react';
import Modal from './Modal';
import AddTips from '../components/forms/AddTips';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParentComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal}>Ajouter un Tips</button>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <AddTips />
                </Modal>
            )}
            <ToastContainer />
        </div>
    );
};

export default ParentComponent;
