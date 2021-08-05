export const reducer = (state, action) => {
  
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      ...state,
      notification: {
        message: action.payload.message,
        severity: action.payload.severity,
      },
    };
  default:
    throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const setNotification = (message, severity) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {message, severity},
  };
};

export const actions = {setNotification};