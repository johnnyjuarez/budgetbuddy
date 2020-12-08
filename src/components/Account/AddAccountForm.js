import React, { useState } from 'react';
import AccountServices from '../../services/account-services';

import './AddAccountForm.css';

const AddAccountForm = (props) => {
  const [accountName, setAccountName] = useState('');
  const [accountTotal, setAccountTotal] = useState(0);
  const [error, setError] = useState(null);
  let userId = localStorage.getItem('userId');
  const handleSubmit = (e) => {
    e.preventDefault();
    let newAccount = {
      account_name: accountName,
      account_total: accountTotal,
    };
    AccountServices.postAccount(newAccount, userId)
      .then((account) => {
        setAccountName('');
        setAccountTotal(0);
      })
      .then(() => {
        props.closeOnSubmit();
      })
      .catch((err) => {
        setError(err.error);
      });
  };

  const accountNameOnChange = (e) => {
    setAccountName(e.target.value);
  };

  const accountTotalOnChange = (e) => {
    setAccountTotal(e.target.value);
  };
  let displayError = null;
  if (error) {
    displayError = (
      <p className='error-display'>Please enter a valid number.</p>
    );
  }

  return (
    <div>
      <h2>New Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='accountname'>Account Name: </label>
        <input
          id='accountname'
          type='text'
          require='true'
          placeholder='account name'
          onChange={accountNameOnChange}
        />
        {displayError}
        <label htmlFor='accounttotal'>Account Total: </label>
        <input
          id='accounttotal'
          type='number'
          require='true'
          step='any'
          defaultValue={accountTotal}
          onChange={accountTotalOnChange}
        />
        <input className='modal-submit' type='submit' />
      </form>
    </div>
  );
};

export default AddAccountForm;
