import React, { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Register from './components/Auth/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Statement from './components/Statement/Statement';
import Spinner from './components/UI/Spinner/Spinner';
import Context from './Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

const App = (props) => {
  const [userId, setUserId] = useState('');

  const addUserId = (userId) => {
    console.log('userId', userId);
    setUserId(userId);
  };

  const value = {
    addUserId,
    user: userId,
  };
  console.log(userId);
  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path='/' component={Auth} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/newStatement' component={Statement} />
        </Switch>
      </Router>
    </Context.Provider>
  );
};
export default App;
