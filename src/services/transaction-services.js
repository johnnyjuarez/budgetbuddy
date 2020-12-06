import config from '../config.js';
import TokenService from '../services/token-services';

const TransactionServices = {
  postTransaction(newTransaction, accountId) {
    return fetch(`${config.API_ENDPOINT}/transactions/${accountId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newTransaction),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => {
          return Promise.reject(e);
        });
      }
      return res.json();
    });
  },
};

export default TransactionServices;
