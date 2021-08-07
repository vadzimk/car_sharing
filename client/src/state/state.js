import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  notification: {message: '', severity: 'info', handleClose: null},
  user: null
  
};

export const StateContext = createContext([
  initialState,
  // eslint-disable-next-line no-unused-vars
  (action) => initialState,
]);

export const StateProvider = ({
  reducer,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
