import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import logo from '../../assets/logo.png';

const useStyles = makeStyles(theme => ({ // get access to the theme properties
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  logo: {
    height: '5em',
  },
  logoContainer: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: '10px',
    marginLeft: '25px',
  },
  iconButton: {
    marginLeft: '25px',
  },
  
}));

export default function Header () {
  const classes = useStyles();
  
  const [value, setValue] = useState('/home');
  
  const {pathname} = useLocation();
  
  useEffect(() => {
    setValue(pathname);
  }, [pathname]);
  
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <Button component={Link} to="/home" className={classes.logoContainer} disableRipple>
            <img src={logo} alt="company logo" className={classes.logo}/>
          </Button>
          <Tabs value={value} onChange={handleChange}
            className={classes.tabContainer}>
            <Tab label="Home" component={Link} to="/home" value="/home"
              className={classes.tab}/>
            <Tab label="Listings" component={Link} to="/listings"
              value="/listings" className={classes.tab}/>
            <Tab label="Reservations" component={Link} to="/reservations"
              value="/reservations" className={classes.tab}/>
          </Tabs>
          <IconButton className={classes.iconButton}>
            <ExitToAppOutlinedIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}/>
    </>
  
  );
}
