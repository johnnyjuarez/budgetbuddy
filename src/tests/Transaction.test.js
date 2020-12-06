import React from 'react';

import ReactDOM from 'react-dom';

import AddTransactionForm from '../components/Transaction/AddTransactionForm';

describe('transaction testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddTransactionForm />, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});
