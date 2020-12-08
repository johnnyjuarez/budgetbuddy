import React from 'react';
import './LandingModal.css';

export default function LandingModal() {
  return (
    <div>
      <h1 className='landing-logo'>Budget Buddy</h1>
      <p>
        A budgeting tracking web application. Think of it like a digital
        checkbook!
      </p>
      <p>
        Simply sign up, create banking accounts, and add transactions to
        whichever account necessary!
      </p>
      <p className='disclaimer'>
        <span>Disclaimer: </span> in no way is this application tied to your
        actual banking accounts, all inputs are from the user.
      </p>
      <p className='disclaimer'>Testing Credentials - </p>
      <p className='disclaimer'>Email: test@test.com</p>
      <p className='disclaimer'>Password: Password12#</p>
    </div>
  );
}
