import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard/Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Dashboard />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
