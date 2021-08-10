import {createTheme} from '@material-ui/core';

// const defaultTheme = createTheme();
const myBlue = '#0b72b9';
const myOrange = '#ffba60';

// https://material.io/resources/color/#!/?view.left=1&view.right=1&primary.color=B0BEC5&secondary.color=00ACC1

const theme = createTheme({
  palette: {
    common: {
      blue: myBlue,
      orange: myOrange,
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
    fontFamily: '"Comfortaa", "Roboto"',

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