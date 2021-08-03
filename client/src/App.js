import React from 'react';
// import dateService from './services/date.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, ThemeProvider} from '@material-ui/core';
import Header from './components/ui/Header.js';
import theme from './Theme.js';
import routes from './routes.js';
import Footer from './components/ui/Footer.js';
import Notification from './components/ui/Notification.js';
import {StateProvider, reducer, useStateValue} from './state';

const App = () => {
  
  // TODO remove date service
  // const [date, setDate] = useState('');
  // useEffect(async () => {
  //   const date = await dateService();
  //   setDate(date);
  // }, []);
  // console.log('date', date);
  
  const [state,] = useStateValue();
  
  return (
    <StateProvider reducer={reducer}>
      <ThemeProvider theme={theme}>
        <Notification/>
        <Router>
          <Container>
            <Header/>
            <Notification message={state.notification.message} severity={state.notification.severity}/>
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
