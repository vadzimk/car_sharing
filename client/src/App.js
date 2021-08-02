import React from 'react';
// import dateService from './services/date.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container, ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Header from './components/ui/Header.js';
import theme from './Theme.js';
import routes from './routes.js';
import Footer from './components/ui/Footer.js';

const App = () => {
  
  // TODO remove date service
  // const [date, setDate] = useState('');
  // useEffect(async () => {
  //   const date = await dateService();
  //   setDate(date);
  // }, []);
  // console.log('date', date);
  
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        <Footer/>
      </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
