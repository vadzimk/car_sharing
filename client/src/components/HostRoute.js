import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const HostRoute = ({children, ...rest}) => {
  
  const user = useSelector(state => state.user);
  
  // return (
  //   <Route {...rest} >
  //     {user?.ishost ? children:
  //       (user ? <Redirect to="/"/>:
  //         <Redirect to="/login"/>)}
  //   </Route>
  // );
  return (
    <Route
      {...rest}
      render={({location}) =>
        user?.ishost ? (
            children
          ):
          user ? (<Redirect to={{
            pathname: '/',
            state: {from: location},
          }}/>):(
            <Redirect
              to={{
                pathname: '/login',
                state: {from: location},
              }}
            />
          )
      }
    />
  );
};

export default HostRoute;