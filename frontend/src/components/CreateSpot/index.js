import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateASpot from './CreateSpot';
import './CreateSpot.css';



function CreateASpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='createSpotNavBtn'>Become A Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateASpot setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateASpotModal;