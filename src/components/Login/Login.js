import React, { useState, useContext, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-services';
import TokenService from '../../services/token-services';
import Context from '../../Context';

import './Login.css';

const Login = (props) => {
  // context to pass userId to App.js
  const context = useContext(Context);
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // hook for changing route
  const history = useHistory();
  const goToRegister = () => {
    history.push('/register');
  };

  useEffect(() => {
    if (isSubmit) {
      let isMounted = true;
      setError(null);
      AuthApiService.postLogin({
        email: email,
        password: password,
      })
        .then((res) => {
          if (isMounted) {
            TokenService.saveAuthToken(res.authToken);
            props.history.replace('/dashboard');
            context.addUserId(res.id);
          }
          isMounted = false;
        })
        .catch((err) => {
          console.error(err.error);
        });
    }
    setIsSubmit(false);
  }, [isSubmit]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  let errorMessage = null;
  if (error) {
    errorMessage = <p className='error-message'>{error}</p>;
  }
  return (
    <div className='auth'>
      <h1 className='logo'>Budget Buddy</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <label>Email: </label>
        <input
          className='input'
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => onChangeEmail(e)}
        />
        <label>Password:</label>
        <input
          className='input'
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => onChangePassword(e)}
        />
        {errorMessage}
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
};

export default withRouter(Login);
