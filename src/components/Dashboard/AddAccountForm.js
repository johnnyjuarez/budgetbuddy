import React, { useContext, useState } from 'react';
import Context from '../../Context';
import AccountServices from '../../services/account-services';

const AddAccountForm = (props) => {
  const context = useContext(Context);
  const [accountName, setAccountName] = useState('');
  const [accountTotal, setAccountTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newAccount = {
      account_name: accountName,
      account_total: accountTotal,
    };
    AccountServices.postAccount(newAccount, context.user).then((account) => {
      console.log('this is account', account);
      setAccountName('');
      setAccountTotal(0);
    });
  };

  const accountNameOnChange = (e) => {
    setAccountName(e.target.value);
  };

  const accountTotalOnChange = (e) => {
    setAccountTotal(e.target.value);
  };

  return (
    <div>
      <h2>Add Account Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='accountname'>Account Name: </label>
        <input
          type='text'
          qrequire='true'
          placeholder='account name'
          onChange={accountNameOnChange}
        />
        <label htmlFor='accounttotal'>Account Total: </label>
        <input
          type='number'
          step='any'
          defaultValue={accountTotal}
          onChange={accountTotalOnChange}
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default AddAccountForm;