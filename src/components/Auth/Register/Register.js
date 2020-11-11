import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthApiService from '../../../services/auth-api-services';

import classes from './Register.module.css';

const Auth = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    // post function for users from auth services
    AuthApiService.postUser({
      email,
      password,
    })
      .then((user) => {
        // reset email and password fields
        console.log('this is user', user);
        setEmail('');
        setPassword('');
        // redirect user to the userdashboard path
        if (!error) {
          props.history.replace('/dashboard');
        }
      })
      .catch((err) => {
        setError(err.error);
      });
  };
  let errorMessage = null;
  if (error) {
    errorMessage = <p className='error-message'>{error}</p>;
  }

  return (
    <div className={classes.register}>
      <h1 className={classes.logo}>Budget Buddy</h1>
      <form className={classes.regForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={classes.inputItem}>
          <label>Email</label>
          <input
            className={classes.input}
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className={classes.inputItem}>
          <label>Password</label>
          <input
            className={classes.input}
            type='password'
            placeholder="It's a secret"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {errorMessage}
        <div className='btnBox'>
          <input type='submit' className='btn register' value='submit' />
        </div>
      </form>
    </div>
  );
};

export default withRouter(Auth);
