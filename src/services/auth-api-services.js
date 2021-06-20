import config from '../config';

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
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
        'Access-Control-Allow-Origin': 'no-cors'
      },
      body: JSON.stringify(user),
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

export default AuthApiService;
