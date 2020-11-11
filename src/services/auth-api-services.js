import config from '../config';

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => {
          return Promise.reject(e);
        });
      }
      return res.json();
    });
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log('this is user', res);
      if (!res.ok) {
        return res.json().then((e) => {
          return Promise.reject(e);
        });
      }
      return res.json();
    });
  },
};

export default AuthApiService;
