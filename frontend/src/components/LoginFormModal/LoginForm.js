// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(setShowModal(false))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h2 className="loginH2"> Welcome to Airbnb !</h2>
      <label className="loginLabel">
        <input
          className="loginInput"
          placeholder=" Enter username or email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className="loginLabel">
        <input
          className="loginInput"
          placeholder=" Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='loginBtn' type="submit">Log In</button>
      <button className="demoUser" type="submit" onClick={() => { setCredential('User1'); setPassword('password1') }}>DEMO</button>
    </form>
  );
}

export default LoginForm;
