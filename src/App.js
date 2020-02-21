import React, { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Register from './components/Auth/Register/Register'
import Dashboard from './components/Dashboard/Dashboard';
import Statement from './components/Statement/Statement'
import Spinner from './components/UI/Spinner/Spinner'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './components/firebase'

import './App.css';

const App = props => {

  const [firebaseInit, setFirebaseInit] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInit(val);
    })
  })

  return firebaseInit !== false ? (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/newStatement" component={Statement} />
      </Switch>
    </Router>
  ) : <Spinner />
}

export default App;
