import config from '../config.js';

const AccountServices = {
  postAccount(newAccount, userId) {
    return fetch(`${config.API_ENDPOINT}/accounts/${userId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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
