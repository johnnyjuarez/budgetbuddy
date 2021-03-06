import React from 'react';
import Auth from './components/Login/Login';
import Register from './components/Login/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Context from './Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = (props) => {
  const addUserId = (userId) => {
    localStorage.setItem('userId', userId);
  };

  const value = {
    addUserId,
  };

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/'>
            <Auth />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};
export default App;
