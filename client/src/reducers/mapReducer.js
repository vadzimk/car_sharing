import mapService from '../services/mapService.js';
import {setNotification} from './notificationReducer.js';

const mapReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_MAP_RESULTS':
    return [...action.payload];
  default:
    return state;
  }
};

export const getMapResults = (where) => {
  return async (dispatch) => {
    const {success, error, data} = await mapService.getMapResults(where);
    if(success){
      dispatch({
        type: 'GET_MAP_RESULTS',
        payload: data
      });
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export default mapReducer;