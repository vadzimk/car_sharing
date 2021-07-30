import React, {useEffect, useState} from 'react';
import dateService from './services/date.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, ThemeProvider} from '@material-ui/core';
import Header from './components/ui/Header.js';
import theme from './Theme.js';
import routes from './routes.js';

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
            {
              routes.map((item) => (
                <Route exact path={item.path} component={item.component}
                       key={item.label}/>
              ))
            }
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
