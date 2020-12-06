import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../components/Login/Login';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Login />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
