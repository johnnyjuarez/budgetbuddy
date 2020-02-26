import React, { useState, useEffect } from 'react';

import firebase from '../firebase';
import { withRouter, useHistory } from 'react-router-dom';

const Dashboard = props => {
    const [newTotal, setNewTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {

        getTotal();
    }, []);

    if (!firebase.auth.currentUser) {
        // not logged in
        alert('Please login first');
        history.push('/');
        return null
    }
    const getTotal = (user) => {
        firebase.db.collection(firebase.auth.currentUser.uid).doc('transactions')
            .onSnapshot(function (doc) {
                console.log(doc.data().total)
                setNewTotal(doc.data().total);
            })
    }
    return (
        <div>
            <h1>Welcome {firebase.getCurrentUsername()}</h1>
            <p>Total: {newTotal}</p>
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