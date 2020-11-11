import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context';
import config from '../../config';

import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = (props) => {
  const context = useContext(Context);
  const [newTotal, setNewTotal] = useState(0);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/accounts/1`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setUserData(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <p>Total: {userData.account_total}</p>
      <select>
        <option value={`${userData.account_name}`}>
          {userData.account_name}
        </option>
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
