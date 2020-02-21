import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Statement = props => {
    // ! State - uid, total
    const [user, setUser] = useState(null)
    const [total, setTotal] = useState('');

    useEffect(() => {
        setUser(firebase.auth.currentUser.uid)
    }, [user])

    const onSubmitHandler = (user, total) => {
        console.log(firebase.db)
    }

    const writeUpdate = (user) => {
        const updates = {};
        var newPostKey = firebase.db.ref().child('users').push().key;
        updates['/users' + newPostKey] = user;

        firebase.db.ref().update(updates);
    }



    return (
        <div>
            <h1> New Statement Page</h1>
            <form type='submit'>
                <input type="number" placeholder="enter new total" value={total} onChange={event => setTotal(event.target.value)} />
            </form>
            <p>total: {total}</p>
            <button onClick={onSubmitHandler(user, total)}>Submit</button>
        </div>
        // attempt to create individual objects based on uid
        // write to db - ex add to "total"
    )
}

export default Statement;