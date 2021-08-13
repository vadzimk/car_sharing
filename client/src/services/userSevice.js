import api from './api.js';


const getAllCountries = async () => {
  try {
    const res = await api.get('/user/countries');
    return {
      success: res.status === 200,
      error: res.data.error?.message,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.message, data: []};
  }
  
};

const signUp = async (newUser) => {
  try {
    const res = await api.post( '/user/signup', newUser);
    return {
      success: res.status === 200,
      error: res.data.error?.message ===
      'duplicate key value violates unique constraint "email_unique"' ?
        `email ${newUser.email} already exists, try to login instead.`:
        res.data.error?.message,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.message};
  }
};

const login = async (credentials) => {
  try {
    const res = await api.post('/user/login', credentials);
    return {
      success: res.status === 200,
      error: res.data.error?.message,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.message};
  }
};

const userService = {getAllCountries, signUp, login};
export default userService;