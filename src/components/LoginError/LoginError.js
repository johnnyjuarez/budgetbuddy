import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginError() {
  const history = useHistory();
  function loginScreen() {
    history.push('/');
  }
  return (
    <div>
      <h2>Please Log In First</h2>
      <button onClick={loginScreen}>Take me back</button>
    </div>
  );
}
