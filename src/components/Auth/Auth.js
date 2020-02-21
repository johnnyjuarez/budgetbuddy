import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import firebase from '../firebase'

import './Auth.css';

const Auth = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // hook for changing route
    const history = useHistory();
    const goToRegister = () => {
        history.push('/register')
    }

    return (
        <div className="auth">
            <h1 className='logo'>Budget Buddy</h1>
            <form>
                <input className="input" type="email" placeholder="Enter Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                <input className="input" type="password" placeholder="Enter Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            </form>
            <p>Please log in to continue</p>
            <div className='btnBox'>
                <button className='btn login' onClick={login}>Log in</button>
                <button className='btn register' onClick={goToRegister}>Sign Up</button>
            </div>
        </div>
    )

    // login function called from firebase config file
    async function login() {
        try {
            await firebase.login(email, password)
            props.history.replace('/dashboard')
        } catch (err) {
            alert(err.message);
        }
    }
}

export default withRouter(Auth)