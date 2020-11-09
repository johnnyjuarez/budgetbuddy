import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';


import classes from './Register.module.css';

const Auth = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')



    return (
        <div className={classes.register}>
            <h1 className={classes.logo}>Budget Buddy</h1>
            <form className={classes.regForm}>
                <div className={classes.inputItem}>
                    <label>Email</label>
                    <input className={classes.input} type="email" placeholder="Enter Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className={classes.inputItem}>
                    <label>Password</label>
                    <input className={classes.input} type="password" placeholder="It's a secret" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>
            </form>
            <div className='btnBox'>
                <button className='btn register' onClick={onRegister}>Submit</button>
            </div>
        </div>
    )
    async function onRegister() {
        try {
            props.history.replace('/dashboard')
        } catch (err) {
            alert(err.message)
        }
    }
}

export default withRouter(Auth)