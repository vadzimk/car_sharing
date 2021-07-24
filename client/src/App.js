import React, {useEffect, useState} from 'react';
import dateService from './services/date.js';

function App() {
  const [date, setDate] = useState('');
  useEffect(async() => {
    const date = await dateService();
    setDate(date);
  },[]);


  console.log('date', date);
  return (
    <div>
      {date}
    </div>
  );
}

export default App;
