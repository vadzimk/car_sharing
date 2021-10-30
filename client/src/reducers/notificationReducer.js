
const notificationReducer = (state={message: '', severity: 'info', handleClose: null}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
        ...action.payload
    };
  default:
    return state;
  }
};
// 'success' | 'info' | 'warning' | 'error'
export const setNotification = (message, severity, handleClose = null) => {
  
  return {
    type: 'SET_NOTIFICATION',
    payload: {message, severity, handleClose},
  };
};

export default notificationReducer;