import axios from 'axios';

const baseUrl = '/api/user';

const getAllCountries = async () => {
  try {
    const res = await axios.get(baseUrl + '/countries');
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
    const res = await axios.post(baseUrl + '/signup', newUser);
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
    const res = await axios.post(baseUrl + '/login', credentials);
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