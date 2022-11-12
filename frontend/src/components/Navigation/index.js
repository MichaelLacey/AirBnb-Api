// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignupFormPage';
import CreateASpotModal from '../CreateSpot';
import bnbLogo from '../images/airBnbLogo.jpg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <CreateASpotModal />
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <CreateASpotModal /> */}
        <LoginFormModal />
        <SignUpFormModal />
      </>
    );
  }

  return (
    <div className="navDiv">

  <div className="bnbLogo"><NavLink exact to='/'> <img src={bnbLogo} className={'homeNavPic'} alt=''></img> </NavLink>
  <NavLink exact to='/' className='navH2Logo'><h2 className='h2Logo'>AirBnb</h2></NavLink>
  </div>
    <ul className='ulNav'>
      <div className='navBar'>
        {/* <NavLink exact to='/'> <img src={bnbLogo} className={'homeNavPic'} alt=''></img> </NavLink> */}
        {isLoaded && sessionLinks}
      </div>
    </ul>
    </div>
    
  );
}

export default Navigation;