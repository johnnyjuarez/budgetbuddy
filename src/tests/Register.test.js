import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Register from '../components/Login/Register/Register';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Register />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
