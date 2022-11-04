import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)} className='signupnavbtn'>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          < SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;