import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const HostRoute = ({children, ...rest}) => {
  console.dir('host route', rest);
  
  const user = useSelector(state => state.user);
  
  return (
    <Route {...rest} >
      {user?.ishost ? children:
        (user ? <Redirect to="/"/>:
          <Redirect to="/login"/>)}
    </Route>
  );
};

export default HostRoute;