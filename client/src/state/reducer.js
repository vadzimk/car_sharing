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
  case 'SET_USER':
    return {
      ...state,
      user: {
        ...action.payload
      }
    };
  default:
    throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const setNotification = (message, severity) => {
  console.log('setNotification, message: ', message);
  return {
    type: 'SET_NOTIFICATION',
    payload: {message, severity},
  };
};

const setUser = (user)=>{
  return{
    type: 'SET_USER',
    payload: user
  };
};

export const actions = {setNotification, setUser};