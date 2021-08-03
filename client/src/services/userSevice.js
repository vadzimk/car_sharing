import axios from 'axios';

const baseUrl = '/api/user';

const getAllCountries = async () => {
  try {
    const res = await axios.get(baseUrl + '/countries');
    return res.data;
  } catch (e) {
    console.log('error', e);
  }
  
};

const signUp = async (newUser) => {
  try {
    const res = await axios.post(baseUrl + '/signup', newUser);
    console.log('status', res.status);
    return res.status === 200;
    
  } catch (e){
    console.log(e);
  }
};

const userService = {getAllCountries, signUp};
export default userService;