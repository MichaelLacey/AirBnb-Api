// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
// import SignUpFormModal from '../SignupFormPage';
import CreateASpotModal from '../CreateSpot';
import bnbLogo from '../images/airBnbLogo.jpg'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import { Modal } from '../../context/Modal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  if (sessionUser) {
    // sessionLinks = (
      <>
        {/* {sessionUser && <CreateASpotModal /> } */}
        {/* <ProfileButton user={sessionUser} /> */}
      </>
    // );
  } 
    

  return (
    <div className="navDiv">

      <div className="bnbLogo"><NavLink exact to='/'> <img src={bnbLogo} className={'homeNavPic'} alt=''></img> </NavLink>
        <NavLink exact to='/' className='navH2Logo'><h2 className='h2Logo'>LaceyBnb</h2></NavLink>
      </div>
      <ul className='ulNav'>
        <div className='navBar'>
        {sessionUser && <CreateASpotModal /> }
          {isLoaded && (
            <ProfileButton user={sessionUser}
              setLogin={setLogin}
              setShowModal={setShowModal} />)}
        </div>
      </ul>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal}/> : <SignupFormPage setShowModal={setShowModal}/>}
        </Modal>)}

    </div>

  );
}

export default Navigation;