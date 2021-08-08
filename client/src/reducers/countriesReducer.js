import userService from '../services/userSevice.js';
import {setNotification} from './notificationReducer.js';

const countriesReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL_COUNTRIES':
    return [...action.payload];
    
  default:
    return state;
  }
};

export const getAllCountries = () => {
  return async (dispatch) => {
    const {data: countries, success} = await userService.getAllCountries();
    
    if (success) {
      dispatch({
        type: 'GET_ALL_COUNTRIES',
        payload: countries,
      });
    } else {
      dispatch(setNotification('Service unavailable', 'error'));
    }
    
  };
};

export default countriesReducer;