import React, { useState } from 'react';
import TransactionServices from '../../services/transaction-services';

import './AddTransactionForm.css';

export default function AddTransactionForm(props) {
  // amount, type, description
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('increase');
  const [transactionDescrip, setTransactionDescrip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTransaction = {
      amount: transactionAmount,
      type: transactionType,
      description: transactionDescrip,
    };
    TransactionServices.postTransaction(newTransaction, props.accountId)
      .then(() => {
        setTransactionAmount(0);
        setTransactionDescrip('');
      })
      .then(() => {
        props.closeOnSubmit();
      });
  };

  const transactionAmountOnChange = (e) => {
    setTransactionAmount(e.target.value);
  };
  const transactionTypeOnChange = (e) => {
    setTransactionType(e.target.value);
  };
  const transactionDescripOnChange = (e) => {
    setTransactionDescrip(e.target.value);
  };

  return (
    <div>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='transactionAmount'>Amount:</label>
        <input
          type='number'
          step='any'
          require='true'
          onChange={transactionAmountOnChange}
        />
        <label htmlFor='transactionType'>Type:</label>
        <select onChange={transactionTypeOnChange}>
          <option defaultValue value='increase'>
            Increase
          </option>
          <option value='decrease'>Decrease</option>
        </select>
        <label htmlFor='transactionDescrip'>Description:</label>
        <input
          type='text'
          require='true'
          onChange={transactionDescripOnChange}
        />
        <input type='submit' />
      </form>
    </div>
  );
}
