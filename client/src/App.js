import React, {useEffect, useState} from 'react';
import dateService from './services/date.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, ThemeProvider} from '@material-ui/core';
import SignUp from './components/SignUp';
import Header from './components/ui/Header.js';
import theme from './Theme.js';

const App = () => {
  const [date, setDate] = useState('');
  useEffect(async () => {
    const date = await dateService();
    setDate(date);
  }, []);
  
  console.log('date', date);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Header/>
          <Switch>
            <Route exact path="/home" component={()=><div>Home</div>}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/listings" component={()=><div>Listings</div>}/>
            <Route exact path="/reservations" component={()=><div>Reservations</div>}/>
          
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
