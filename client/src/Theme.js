import {createTheme} from '@mui/material';
const defaultTheme = createTheme();


// https://material.io/resources/color/#!/?view.left=1&view.right=1&primary.color=B0BEC5&secondary.color=00ACC1

const theme = createTheme({
  palette: {
    common: {
      orange: '#ffba60',
      danger: '#ff1744',
      green: '#00e676',
      blue: '#2196f3'
    },
    primary: {
      light: '#e2f1f8',
      main: '#b0bec5',
      dark: '#808e95',
      contrastText: '#000000'
    },
    secondary: {
      light: '#5ddef4',
      main: '#00acc1',
      dark: '#007c91',
      contrastText: '#000000'
    },
  },
  text:{
    primary: 'rgba(0, 0, 0, 0.85)',
    disabled: 'rgba(0, 0, 0, 0.60)',
    hint: 'rgba(0, 0, 0, 0.38)'
    },
  typography: {
    fontFamily: 'Roboto',
    h1: {
     ...defaultTheme.typography.h1,
      fontFamily: 'Comfortaa',
    },
    h2: {
      ...defaultTheme.typography.h2,
      fontFamily: 'Comfortaa',
    },
    h3: {
      ...defaultTheme.typography.h3,
      fontFamily: 'Comfortaa',
    },
    h4: {
      ...defaultTheme.typography.h4,
      fontFamily: 'Comfortaa',
    },
    h5: {
      ...defaultTheme.typography.h5,
      fontFamily: 'Comfortaa',
    },
    h6: {
      ...defaultTheme.typography.h6,
      fontFamily: 'Comfortaa',
    },
  },
  custom: {
    mainColumn: {
      marginBottom: '3em',
      width: '20em',
      minHeight: '35em',
    },
    tab: {
      fontFamily: 'Comfortaa',
      textTransform: 'none',
      fontSize: '1.1rem',
    },
  },
});

export default theme;