import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {makeStyles} from '@material-ui/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import logo from '../../assets/logo.png';
import routes from '../../routes.js';

const useStyles = makeStyles(theme => ({ // get access to the theme properties
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '-0.25em',
    },
  },
  logo: {
    height: '5em',
    [theme.breakpoints.down('md')]: {
      height: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3.5em',
    },
  },
  logoContainer: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    opacity: '0.7',
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerItemTextSelected: {
    paddingBottom: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.secondary.main,
  },

  
}));

export default function Header () {
  // eslint-disable-next-line no-undef
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  
  const classes = useStyles();
  
  const [location, setLocation] = useState('/');
  
  const {pathname} = useLocation();
  const newLocation = '/'.concat(pathname.split('/')[1]);
  useEffect(() => {
    setLocation(newLocation);
  }, [pathname]);
  
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const handleChange = (e, newValue) => {
    setLocation(newValue);
  };
  const menu = (
    <>
      <Tabs value={location} onChange={handleChange}
            className={classes.tabContainer}>
        {
          routes.map((item) => (
            <Tab label={item.label} component={Link} to={item.path}
                 value={item.path}
                 className={classes.tab} key={item.label}/>
          ))
        }
      </Tabs>
      <IconButton className={classes.iconButton}>
        <ExitToAppOutlinedIcon/>
      </IconButton>
    </>
  );
  
  const drawer = (
    <>
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                       open={openDrawer} onClose={() => setOpenDrawer(false)}
                       onOpen={() => setOpenDrawer(true)}
                       classes={{paper: classes.drawer}}
                       anchor="right"
      >
        <List disablePadding>
          {
            routes.map((item) => (
              <ListItem component={Link} to={item.path} divider button
                        onClick={() => setOpenDrawer(false)}
                        key={item.label}
                        selected={location === item.path}
                        className={location === item.path ?
                          classes.drawerItemSelected:
                          classes.drawerItem}
              >
                <ListItemText disableTypography
                              className={location === item.path &&
                              classes.drawerItemTextSelected}>
                  {item.label}
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple
                  className={classes.drawerIconContainer}>
        <MenuIcon/>
      </IconButton>
    </>
  );
  
  return (
    <>
      <AppBar position="absolute" >
        <Toolbar>
          <Button component={Link} to="/home" className={classes.logoContainer}
                  disableRipple>
            <img src={logo} alt="company logo" className={classes.logo}/>
          </Button>
          {
            matches ? drawer:menu
          }
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}/>
    </>
  
  );
}
