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
  Divider,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

import {makeStyles} from '@material-ui/styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import logo from '../../assets/logo.png';
import routes, {byLable} from '../../routes.js';

const useStyles = makeStyles(theme => ({ // get access to the theme properties
  toolbar:{
    backgroundColor:theme.palette.primary.light,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.up('lg')]: {
      marginBottom: '2em',
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
    ...theme.custom.tab,
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
    backgroundColor: theme.palette.primary.light,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawerItem: {
    opacity: '0.7',
  },
  drawerItemSelected: {
    opacity: 1,
    // textDecoration: 'underline',
    // textDecorationColor: theme.palette.secondary.main
  },
  drawerItemTextSelected: {
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.secondary.main,
    borderBottomWidth: '2px',
  },
  
}));

export default function Header () {
  // eslint-disable-next-line no-undef
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  
  const classes = useStyles();
  
  const [location, setLocation] = useState('/');
  
  const {pathname} = useLocation();
  const newLocation = '/'.concat(pathname.split('/')[1]);
  useEffect(() => {
    setLocation(newLocation);
  }, [newLocation]);
  
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const handleChange = (e, newValue) => {
    setLocation(newValue);
  };
  
  const routesForHeader = routes.filter(
    byLable(['Home', 'Listings', 'Reservations']),
  );
  
  const menu = (
    <>
      <Tabs value={routesForHeader.map(r=>r.path).includes(location) ? location : false} onChange={handleChange}
            className={classes.tabContainer}>
        {
          routesForHeader.map((item) => (
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
        <div className={classes.drawerHeader}
             onClick={() => setOpenDrawer(false)}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon/>:<ChevronRightIcon/>}
        </div>
        <Divider/>
        <List disablePadding>
          {
            routesForHeader.map((item) => (
              <ListItem component={Link} to={item.path} divider button
                        onClick={() => setOpenDrawer(false)}
                        key={item.label}
                        selected={location === item.path}
                        className={location === item.path ?
                          classes.drawerItemSelected:
                          classes.drawerItem}
              
              >
                <ListItemText disableTypography
                              classes={location === item.path ?
                                {root: classes.drawerItemTextSelected}:null}>
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
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/" className={classes.logoContainer}
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
