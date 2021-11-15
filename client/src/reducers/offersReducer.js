import {setNotification} from './notificationReducer.js';
import offerService from '../services/offerService.js';

const offersReducer = (state=[], action)=>{
  switch (action.type){
  case 'GET_OFFERS':
    return [...action.payload];
  default:
    return state;
  }
};

export const getOffers =(bbox, dateFrom, dateTo, attributes={})=>{
  return async (dispatch)=>{
    const {success,error,data} = await offerService.getOffers(bbox, dateFrom, dateTo, attributes);
    if (success) {
      console.log('data', data);
      dispatch({
        type: 'GET_OFFERS',
        payload: data
      });
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
  
};

export default offersReducer;