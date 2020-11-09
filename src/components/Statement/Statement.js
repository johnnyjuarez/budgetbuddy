import React, { useState, useEffect } from 'react';


const Statement = props => {
    let transaction = [];
    // ! State - uid, total
    const [user, setUser] = useState('')
    const [total, setTotal] = useState('');
    const [transactions, setTransactions] = useState([]);

    const snapShotHandler = (user) => {
            
    }

    useEffect(() => {
        // ? Check if total is true in db, if so have input-total rendered
        // snapShotHandler(user);
    }, [transactions, user])

    // ? Work on getting transaction history pushed instead of overwritten.



    return (
        <div>
            <h1> New Statement Page</h1>
            <form type='submit'>
                <input type="number" placeholder="enter new total" value={total} onChange={event => setTotal(event.target.value)} />
            </form>
            <p>total: {total}</p>
            <button onClick={() => snapShotHandler(user)}>Test</button>
        </div>
    )
}

export default Statement;