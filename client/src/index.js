import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store.js';
import theme from './Theme.js';
import {CypressHistorySupport} from 'cypress-react-router';
// import api from './services/api.js';
import {StyledEngineProvider} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';

/**
 * now
 * using token from local storage
 * see /services/api.js
 * */
// api.interceptors.request.use(req => {
//   let token = store.getState().user.token;
//   req.headers.authorization = `Bearer ${token}`;
//   return req;
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <CypressHistorySupport/>
            <App/>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);


