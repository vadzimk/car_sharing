import React, {useEffect, useState} from 'react';
import dateService from './services/date.js';

import {BrowserRouter as Router} from 'react-router-dom';
import {Container} from '@material-ui/core';
import MenuAppBar from './MenuAppBar.js';

const App = () => {
  const [date, setDate] = useState('');
  useEffect(async () => {
    const date = await dateService();
    setDate(date);
  }, []);


  console.log('date', date);
  return (
    <Router>
      <Container>
        <MenuAppBar/>
      </Container>
    </Router>
  );
};

export default App;
