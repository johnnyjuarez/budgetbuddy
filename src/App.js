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
  const [userId, setUserId] = useState(0);

  const addUserId = (userId) => {
    setUserId(userId);
  };

  const value = {
    addUserId,
    user: userId,
  };

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/dashboard'>
            <Dashboard userId={userId} />
          </Route>
          <Route path='/newStatement' component={Statement} />
          <Route path='/'>
            <Auth />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};
export default App;
