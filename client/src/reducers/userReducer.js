//action creator

import userService from '../services/userSevice.js';
import {setNotification} from './notificationReducer.js';

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload;
  case 'SIGNUP':
    return {
      ...state,
    };
  case 'GET_USER_FROM_STORAGE':
    return action.payload;
  default:
    return state;
  }
};

export const loginUser = (credentials, onSuccess = () => {
}) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const {success, error, data} = await userService.login(credentials);
    if (success) {
      window.localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      dispatch(setNotification('You are logged in'), 'success');
      onSuccess();
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export const signUpUser = (newUser, onSuccess = () => {
}) => {
  return async (dispatch) => {
    const {success, error} = await userService.signUp(newUser);
    if (success) {
      onSuccess();
      dispatch(setNotification('You\'ve signed up', 'success'));
    } else {
      dispatch(setNotification(`Error: ${error}`, 'error'));
    }
  };
};

export const getUserFromStorage = () => {
  const user = window.localStorage.getItem('user');
  console.log('getUserFromStorage', user);
  
  return {
    type: 'GET_USER_FROM_STORAGE',
    payload: JSON.parse(user),
  };
};



export default userReducer;