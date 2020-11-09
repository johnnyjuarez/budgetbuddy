import React, { useState, useEffect } from 'react';

import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = props => {
    const [newTotal, setNewTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {

        getTotal();
    }, []);

    const getTotal = (user) => {
        
    }
    return (
        <div>
            <h1>Welcome </h1>
            <p>Total: {newTotal}</p>
            <button onClick={() => history.push('/newStatement')}>Add new statement</button>
            <button onClick={logout}>Logout</button>
        </div>
    )

    async function logout() {
        history.push('/')
    }
}

export default withRouter(Dashboard);