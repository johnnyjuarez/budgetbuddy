import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context';
import config from '../../config';
import TokenService from '../../services/token-services';

import AddAccountForm from './AddAccountForm';
import TransactionHistory from './TransactionHistory';

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
    fetch(`${config.API_ENDPOINT}/accounts/${props.userId}`, {
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
  }, [props, context]);

  useEffect(() => {
    let accountId = selectedAccountId.toString();
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
      });
    console.log(selectedAccountId);
  }, [selectedAccountId]);

  const accountNameOptions = userData.map((account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.account_name}
      </option>
    );
  });

  const addAccountHandler = () => {
    setAddAccount(true);
  };

  let addAccountHTML = null;
  if (addAccount) {
    addAccountHTML = <AddAccountForm userId={userData[0]} />;
  }

  let showTransactions = null;
  if (selectedAccountId !== 0) {
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
      {/* <select onChange={(e) => selectAccountChangeHandler(e)}> */}
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
