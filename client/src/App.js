import React from 'react';
// import dateService from './services/date.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, ThemeProvider} from '@material-ui/core';
import Header from './components/ui/Header.js';
import theme from './Theme.js';
import routes from './routes.js';
import Footer from './components/ui/Footer.js';
import Notification from './components/ui/Notification.js';
import {
  StateProvider,
  reducer,
  // useStateValue
} from './state';

const App = () => {
  
  // const [state,] = useStateValue();
  
  return (
    <StateProvider reducer={reducer}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Header/>
            <Notification/>
            <Switch>
              {
                routes.map((item) => (
                  <Route exact path={item.path} component={item.component}
                         key={item.label}/>
                ))
              }
            </Switch>
          </Container>
          <Footer/>
        </Router>
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;
