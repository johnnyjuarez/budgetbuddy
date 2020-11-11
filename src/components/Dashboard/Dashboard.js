import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context';

import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = (props) => {
  const context = useContext(Context);
  const [newTotal, setNewTotal] = useState(0);
  const history = useHistory();
  return (
    <div>
      <h1>Welcome {context.user}</h1>
      <p>Total: {newTotal}</p>
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
