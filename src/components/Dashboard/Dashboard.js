import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context';
import config from '../../config';

import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = (props) => {
  const context = useContext(Context);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState([]);
  const history = useHistory();
  console.log(context.user);
  console.log(props);
  // on component did mount
  useEffect(() => {
    console.log(context.user);
    console.log(props);

    fetch(`${config.API_ENDPOINT}/accounts/${props.userId}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setTotal(data[0].account_total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props, context]);

  const accountNameOptions = userData.map((account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.account_name}
      </option>
    );
  });

  const selectAccountChangeHandler = (e) => {
    console.log('e.target.value', e.target.value);
    console.log(userData);
    for (let i = 0; i < userData.length; i++) {
      console.log(userData[i].id, e.target.value);
      if (userData[i].id === parseInt(e.target.value)) {
        console.log('userData[i]', userData[i]);
        console.log('userData[i].account_total', userData[i].account_total);
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
      <button onClick={() => history.push('/newStatement')}>
        Add new statement
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );

  async function logout() {
    history.push('/');
  }
};

export default withRouter(Dashboard);
