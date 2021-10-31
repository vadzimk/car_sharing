import React, {useEffect} from 'react';
import routes from './routes.js';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import {Container} from '@mui/material';
import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import Notification from './components/ui/Notification.js';
import {useDispatch} from 'react-redux';
import {getUserFromStorage} from './reducers/userReducer.js';
import HostRoute from './components/HostRoute.js';

const App = () => {
  const style = {
    mainContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: '1 0 auto',
    },
    footer: {
      flexShrink: 0,
    },
  };
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserFromStorage());
  }, []);
  const location = useLocation();
  console.log('location', location);
  return (
    <div style={style.mainContainer}>
      <Header/>
      <Notification/>
      <Container maxWidth="xl" style={style.mainContent}>
        <Switch>
          {
            routes.map((item) => (item.access === 'ishost' ?
                <HostRoute exact path={item.path}
                           key={item.label}>
                  <item.component/>
                </HostRoute>:
                <Route exact path={item.path}
                       key={item.label}>
                  <item.component/>
                </Route>
            ))
          }
        </Switch>
      </Container>
      {location.pathname !== '/' && <Footer style={style.footer}/>}
    </div>
  
  );
};

export default App;
