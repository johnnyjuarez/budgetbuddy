import React from 'react';

import firebase from '../firebase';
import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = props => {
    const history = useHistory();

    if (!firebase.auth.currentUser) {
        // not logged in
        alert('Please login first');
        history.push('/');
        return null
    }

    return (
        <div>
            <h1>Welcome {firebase.getCurrentUsername()}</h1>
            <button onClick={() => history.push('/newStatement')}>Add new statement</button>
            <button onClick={logout}>Logout</button>
        </div>
    )

    async function logout() {
        await firebase.logout();
        history.push('/')
    }
}

export default withRouter(Dashboard);