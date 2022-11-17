import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';
import './EditSpot.css';



function EditASpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='editSpotBtn'>Edit your spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditASpotModal;