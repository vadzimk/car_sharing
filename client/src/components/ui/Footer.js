import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    margin: 0,
    position: 'fixed',
    left: 0,
    bottom: 0,
    height: '10em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5em'
    }
  }
}));

const Footer =()=>{
  const classes = useStyles();
  
  return(
    <footer className={classes.footer}>
      Example footer
    </footer>
  );
};

export default Footer;