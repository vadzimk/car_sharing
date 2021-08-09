import {createTheme} from '@material-ui/core';

const defaultTheme = createTheme();
const myBlue = '#0b72b9';
const myOrange = '#ffba60';

const theme = createTheme({
  palette: {
    common: {
      blue: myBlue,
      orange: myOrange,
    },
    primary: {
      main: defaultTheme.palette.grey['300'],
    },
    secondary: {
      main: '#3a919a',
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontSize: '1.1rem',
    },
  },
  custom: {
    mainColumn: {
      marginBottom: '3em',
      width: '20em',
      minHeight: '35em',
    },
  },
});

export default theme;