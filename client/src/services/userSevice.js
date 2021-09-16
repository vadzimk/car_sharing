import api from './api.js';

const signUp = async (newUser) => {
  try {
    const res = await api.post('/user/signup', newUser);
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {
      success: false,
      error: e.response.data.error ===
      'duplicate key value violates unique constraint "email_unique"' ?
        `email ${newUser.email} already exists, try to login instead.`:
        e.response.data.error,
    };
  }
};

const login = async (credentials) => {
  try {
    const res = await api.post('/user/login', credentials);
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.dir('caught error', e);
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};

const userService = {signUp, login};
export default userService;