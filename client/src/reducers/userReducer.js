//action creator

import userService from '../services/userSevice.js';
import {setNotification} from './notificationReducer.js';
import history from 'history/browser';

const userReducer = (state={}, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...action.payload,
    };
  case 'SIGNUP':
    return {
      ...state,
    };
  default:
    return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const {success, error, data} = await userService.login(credentials);
    if (success) {
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      dispatch(setNotification('You are logged in'), 'success');
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export const signUpUser = (newUser) => {
  return async (dispatch) => {
    const {success, error} = await userService.signUp(newUser);
    if (success) {
      dispatch(setNotification('You\'ve signed up', 'success'));
   
      history.push('/login');
    } else {
      dispatch(setNotification(`Error: ${error}`, 'error'));
    }
  };
};

export default userReducer;