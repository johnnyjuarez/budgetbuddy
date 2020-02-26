import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Statement = props => {
    let transaction = [];
    // ! State - uid, total
    const [user, setUser] = useState(firebase.auth.currentUser.uid)
    const [total, setTotal] = useState('');
    const [transactions, setTransactions] = useState([]);

    const snapShotHandler = (user) => {
        firebase.db.collection(user).get()
            .then(querySnapshot => {
                console.log("snapshot received")
                querySnapshot.forEach(doc => {
                    // console.log('Doc.ID: ', doc.id)
                    // console.log('Doc.Key: ', doc.data().Key)
                    // console.log(doc.data().transactonHistory)
                    setTransactions(doc.data())
                    console.log('data being pushed')
                })
            }).then(res => console.log({res}))
    }
    console.log({transactions})

    useEffect(() => {
        // ? Check if total is true in db, if so have input-total rendered
        setUser(firebase.auth.currentUser.uid)
        // snapShotHandler(user);
    }, [transactions, user])

    // ? Work on getting transaction history pushed instead of overwritten.
    const onSubmitHandler = (user, total) => {
        firebase.db.collection(user).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                transactions.push(doc.data().transactonHistory);
                console.log('push transaction', transactions.push(doc.data()))
            })
        })
        transactions.push()
        console.log(transactions);
        firebase.db.collection(user).doc('transactions').set({
            total: total,
            transactonHistory: {
                date: new Date()
            }
        })
            .then(docRef => {
                console.log('Document written with ID: ', docRef);
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div>
            <h1> New Statement Page</h1>
            <form type='submit'>
                <input type="number" placeholder="enter new total" value={total} onChange={event => setTotal(event.target.value)} />
            </form>
            <p>total: {total}</p>
            <button onClick={() => onSubmitHandler(user, total)}>Submit</button>
            <button onClick={() => snapShotHandler(user)}>Test</button>
        </div>
    )
}

export default Statement;