import {setNotification} from './notificationReducer.js';
import listingsService from '../services/listingsService.js';

const listingsReducer = (state=[], action) => {
  switch (action.type) {
  case 'CREATE_LISTING':
    return [...state, action.payload];
  
  case 'GET_ALL_LISTINGS':
    return [...state];
  
  default:
    return state;
  }
};

export const createListing = (newListing, onSuccess) => {
  return async (dispatch) => {
    const {success, error, data} = await listingsService.create(newListing);
    if (success) {
      dispatch({
        type: 'CREATE_LISTING',
        payload: data,
      });
      onSuccess();
      dispatch(setNotification(`Created: ${data.plate}`, 'success'));
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export default listingsReducer;