import React from 'react';

import './DashboardTransactionHistory.css';

const TransactionHistory = (props) => {
  /*
   * Transaction Data Structure
   * amount, description, type, date_added
   */
  let transactions = props.transactions;
  const transactionTable = transactions.map((transaction, i) => {
    let newDate = new Date(transaction.date_added).toDateString();
    return (
      <tr
        className={transaction.type}
        style={{ border: '2px solid black' }}
        key={i}
      >
        <td>{newDate}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>{transactionTable}</tbody>
    </table>
  );
};

export default TransactionHistory;
