import React from 'react';

import ReactDOM from 'react-dom';

import AddAccountForm from '../components/Account/AddAccountForm';

describe('transaction testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddAccountForm />, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});
