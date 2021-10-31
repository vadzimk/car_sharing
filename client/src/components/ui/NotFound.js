import React from 'react';
import { Typography} from '@mui/material';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    }}
    >
      <Typography variant="h4">404</Typography>
      <Typography variant="h4">Not found</Typography>
    
    </div>
  );
};

export default NotFound;