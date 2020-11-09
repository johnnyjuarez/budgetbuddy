import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-services';
import TokenService from '../../services/token-services';

import './Auth.css';

const Auth = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // hook for changing route
  const history = useHistory();
  const goToRegister = () => {
    history.push('/register');
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    setError(null);

    AuthApiService.postLogin({
      email: email,
      // encrypt password
      password: password,
    }).then((res) => {
      setEmail('');
      setPassword('');
      TokenService.saveAuthToken(res.authToken);
      props.history.replace('/dashboard');
    });
  };

  return (
    <div className='auth'>
      <h1 className='logo'>Budget Buddy</h1>
      <form onSubmit={handleSubmitJwtAuth}>
        <input
          className='input'
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => onChangeEmail(e)}
        />
        <input
          className='input'
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => onChangePassword(e)}
        />

        <p>Please log in to continue</p>
        <div className='btnBox'>
          <input type='submit' className='btn login' />
          <button className='btn register' onClick={goToRegister}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );

  async function login() {
    try {
    } catch (err) {
      alert(err.message);
    }
  }
};

export default withRouter(Auth);
