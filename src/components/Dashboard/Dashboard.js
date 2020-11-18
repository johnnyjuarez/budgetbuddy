import React, { useState, useEffect, useContext } from 'react';
import cryptoJS from 'crypto-js';
import Context from '../../Context';
import config from '../../config';
import TokenService from '../../services/token-services';

import AddAccountForm from '../Account/AddAccountForm';
import TransactionHistory from './TransactionHistory';
import Modal from '../Modal/Modal';

import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = (props) => {
  const context = useContext(Context);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState([]);
  const [addAccount, setAddAccount] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  const history = useHistory();
  // on component did mount
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    console.log(userId);
    fetch(`${config.API_ENDPOINT}/accounts/${userId}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setTotal(data[0].account_total);
        setSelectedAccountId(data[0].id);
      })
      .catch((err) => {
        setError(err);
      });
  }, [addAccount]);

  useEffect(() => {
    let accountId = selectedAccountId.toString();
    if (selectedAccountId > 0) {
      fetch(`${config.API_ENDPOINT}/transactions/${accountId}`, {
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTransactionData(data);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(selectedAccountId);
    }
  }, [selectedAccountId]);

  const accountNameOptions = userData.map((account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.account_name}
      </option>
    );
  });

  const addAccountHandler = () => {
    setAddAccount(!addAccount);
  };

  let addAccountHTML = (
    <Modal open={addAccount} onClose={addAccountHandler}>
      <AddAccountForm closeOnSubmit={addAccountHandler} />
    </Modal>
  );

  let showTransactions = null;
  if (transactionData.length > 0) {
    showTransactions = <TransactionHistory transactions={transactionData} />;
  }

  const selectAccountChangeHandler = (e) => {
    setSelectedAccountId(e.target.value);
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === parseInt(e.target.value)) {
        setTotal(userData[i].account_total);
        return total;
      }
    }
  };

  return (
    <div>
      <p>Total: {total}</p>
      <select onChange={selectAccountChangeHandler}>
        {accountNameOptions}
      </select>
      <button onClick={addAccountHandler}>Add a new account</button>
      <button onClick={() => history.push('/newStatement')}>
        Add new statement
      </button>
      {addAccountHTML}
      {showTransactions}
      <button onClick={logout}>Logout</button>
    </div>
  );

  async function logout() {
    history.push('/');
  }
};

export default withRouter(Dashboard);
