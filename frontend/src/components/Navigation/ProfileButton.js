// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu} className='navButton'>
        <i className="fa-solid fa-bars" id='hamburglerButton' />
        <i className="fas fa-user-circle" id="profileLogo" />
      </button>
      {showMenu && (user ?
        <ul className="profile-dropdown">
          <p>{user.username}</p>
          <p>{user.email}</p>

          <button className="logoutButton" onClick={logout}>Log Out</button>

        </ul> :
        <ul className="profile-dropdown">

          <button onClick={() => {
            setLogin(true)
            setShowModal(true)
          }} className='newLoginBtn'>
            Log In
          </button>


          <button onClick={() => {
            setLogin(false)
            setShowModal(true)
          }} className='newSignUpBtn'>
            Sign Up
          </button>

        </ul>
      )}
    </>
  );
}

export default ProfileButton;