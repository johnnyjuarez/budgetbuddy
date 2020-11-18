import React from 'react';

const TransactionHistory = (props) => {
  console.log(props);
  /*
   * Transaction Data Structure
   * amount, description, type, date_added
   */
  let transactions = props.transactions;
  console.log(Array.isArray(transactions));
  const transactionTable = transactions.map((transaction, i) => {
    return (
      <tr key={i}>
        <td>{transaction.date_added}</td>
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
