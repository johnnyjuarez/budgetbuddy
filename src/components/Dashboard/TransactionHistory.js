import React from 'react';

const TransactionHistory = (props) => {
  console.log(props);
  /*
   * Transaction Data Structure
   * amount, description, type, date_added
   */
  const transactions = props.transactions;
  console.log(Array.isArray(transactions));
  const transactionTable = props.transactions.map((transaction, i) => {
    return (
      <tr key={i}>
        <th>{transaction.date_added}</th>
        <th>{transaction.description}</th>
        <th>{transaction.amount}</th>
      </tr>
    );
  });

  return (
    <table>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    </table>
  );
};

export default TransactionHistory;
