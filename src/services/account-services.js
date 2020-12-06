import config from '../config.js';
import TokenService from '../services/token-services';

const AccountServices = {
  postAccount(newAccount, userId) {
    return fetch(`${config.API_ENDPOINT}/accounts/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newAccount),
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

export default AccountServices;
