import axios from 'axios';
// import store from '../store.js';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(req => {
//   let token = store.getState().user.token;
//   req.headers.authorization = `Bearer ${token}`;
//   return req;
// });

api.interceptors.request.use(req => {
  let token = JSON.parse(window.localStorage.getItem('user'))?.token;
  if(token)
  req.headers.authorization = `Bearer ${token}`;
  return req;
});


export default api;