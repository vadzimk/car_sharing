import axios from 'axios';
// import store from '../store.js';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * moved this to index.js
 * uses token from redux state
 * currently not used
 * */
// api.interceptors.request.use(req => {
//   let token = store.getState().user.token;
//   req.headers.authorization = `Bearer ${token}`;
//   return req;
// });

/**
 * uses token from local storage (could expire)
 * */
api.interceptors.request.use(req => {
  let token = JSON.parse(window.localStorage.getItem('user'))?.token;
  if(token)
  req.headers.authorization = `Bearer ${token}`;
  return req;
});


export default api;