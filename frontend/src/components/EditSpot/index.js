import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';
import './EditSpot.css';



function EditASpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='editSpotBtn'>Edit your spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot setShowModal={setShowModal} spot={spot}/>
        </Modal>
      )}
    </>
  );
}

export default EditASpotModal;