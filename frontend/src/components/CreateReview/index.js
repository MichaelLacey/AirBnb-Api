import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';
import './CreateReview.css';



function CreateAReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="reviewModalBtn">

            <button onClick={() => setShowModal(true)} className='createRevModalBtn'>Create review </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReview setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}

export default CreateAReviewModal;