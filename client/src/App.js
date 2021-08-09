import React, {useEffect} from 'react';
import theme from './Theme.js';
import routes from './routes.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, Container} from '@material-ui/core';

import Header from './components/ui/Header.js';
import Footer from './components/ui/Footer.js';
import Notification from './components/ui/Notification.js';
import {useDispatch} from 'react-redux';
import {getUserFromStorage} from './reducers/userReducer.js';


const App = () => {
const style = {
  mainContainer:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent:{
    flex: '1 0 auto'
  },
  footer:{
    flexShrink: 0,
  },
};

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserFromStorage());
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={style.mainContainer}>
          
          <Header/>
          <Notification/>
          <Container style={style.mainContent}>
            <Switch>
              {
                routes.map((item) => (
                  <Route exact path={item.path} component={item.component}
                         key={item.label}/>
                ))
              }
            </Switch>
          </Container>
          <Footer style={style.footer}/>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
