import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context';
import config from '../../config';
import TokenService from '../../services/token-services';

import AddAccountForm from '../Account/AddAccountForm';
import AddTransactionForm from '../Transaction/AddTransactionForm';
import TransactionHistory from './DashboardTransactionHistory';
import LoginError from '../LoginError/LoginError';
import Modal from '../Modal/Modal';

import { withRouter, useHistory } from 'react-router-dom';

import './Dashboard.css';

const Dashboard = (props) => {
  const context = useContext(Context);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState([]);
  const [addAccount, setAddAccount] = useState(false);
  const [addTransaction, setAddTransaction] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  const history = useHistory();
  // on component did mount
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    console.log(userId);
    fetch(`${config.API_ENDPOINT}/accounts/`, {
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
  }, [selectedAccountId, addTransaction]);

  let accountNameOptions = null;
  if (userData.length > 0) {
    accountNameOptions = userData
      .sort((a, b) => a.id - b.id)
      .map((account) => {
        return (
          <option key={account.id} value={account.id}>
            {account.account_name}
          </option>
        );
      });
  }
  const addAccountHandler = () => {
    setAddAccount(!addAccount);
  };

  const addTransactionHandler = () => {
    setAddTransaction(!addTransaction);
  };

  let addAccountHTML = (
    <Modal open={addAccount} onClose={addAccountHandler}>
      <AddAccountForm closeOnSubmit={addAccountHandler} />
    </Modal>
  );

  let addTransactionHTML = (
    <Modal open={addTransaction} onClose={addTransactionHandler}>
      <AddTransactionForm
        accountId={selectedAccountId}
        closeOnSubmit={addTransactionHandler}
      />
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

  let htmlDisplay = (
    <div className='container'>
      <p>Total: ${total}</p>
      <label>Select Account: </label>
      <select onChange={selectAccountChangeHandler}>
        {accountNameOptions}
      </select>
      <div className='btnBox'>
        <button className='dashboard-btn' onClick={addAccountHandler}>
          New Account
        </button>
        <button className='dashboard-btn' onClick={addTransactionHandler}>
          New Transaction
        </button>
      </div>
      {addAccountHTML}
      {addTransactionHTML}
      {showTransactions}
      <button className='logout-btn' onClick={logout}>
        Logout
      </button>
    </div>
  );

  if (!localStorage.getItem('userId')) {
    htmlDisplay = <LoginError />;
  }

  return htmlDisplay;

  async function logout() {
    localStorage.removeItem('userId');
    history.push('/');
  }
};

export default withRouter(Dashboard);
