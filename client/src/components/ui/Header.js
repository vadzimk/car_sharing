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
} from '@mui/material';

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import {makeStyles} from '@mui/styles';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import logo from '../../assets/logo.png';
import routes, {byLabel} from '../../routes.js';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../reducers/userReducer.js';

const useStyles = makeStyles(theme => ({ // get access to the theme properties
  toolbar: {
    backgroundColor: theme.palette.primary.light,
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
    [theme.breakpoints.down('lg')]: {
      height: '4em',
    },
    [theme.breakpoints.down('md')]: {
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
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconButtonDrawer: {
    padding: '3px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
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
    // opacity: '0.7',
  },
  drawerItemSelected: {
    fontWeight: 'bold',
    // textDecoration: 'underline',
    // textDecorationColor: theme.palette.secondary.main
  },
  drawerItemTextSelected: {
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.secondary.main,
    borderBottomWidth: '2px',
    fontFamily: theme.custom.tab.fontFamily,
  },
  drawerItemText: {
    fontFamily: theme.custom.tab.fontFamily,
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
  }, [newLocation]);
  
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const handleChange = (e, newValue) => {
    setLocation(newValue);
  };
  
  const user = useSelector(state => state.user);
  let routesForHeader = routes.filter(
    byLabel(['Home', 'Login']),
  );
  
  if (user?.ishost) {
    routesForHeader = routes.filter(
      byLabel(['Home', 'Listings', 'Reservations', 'Locations']),
    );
  }
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  const menu = (
    <>
      <Tabs
        value={routesForHeader.map(r => r.path).includes(location) ?
          location:
          false}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor={'secondary'}
        textColor={'inherit'}
      >
        {
          routesForHeader.map((item) => (
            <Tab label={item.label} component={Link} to={item.path}
                 value={item.path}
                 className={classes.tab} key={item.label}
                 disableRipple
            />
          ))
        }
      </Tabs>
      {user && <IconButton
        className={classes.iconButton}
        disableRipple
        disableFocusRipple
        size="large"
        onClick={handleLogout}
      >
        <ExitToAppOutlinedIcon/>
      </IconButton>
      }
    </>
  );
  
  const drawer = (
    <div className={classes.tabContainer}>
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
                        disableRipple
              
              >
                <ListItemText disableTypography
                              classes={
                                {
                                  root: location === item.path ?
                                    classes.drawerItemTextSelected:
                                    classes.drawerItemText,
                                }
                              }>
                  {item.label}
                </ListItemText>
              </ListItem>
            ))
          }
          {user && <ListItem
            onClick={handleLogout}
            className={classes.drawerIconContainer}
          >
            <IconButton
              disableRipple
              disableFocusRipple
              size="large"
              className={classes.iconButtonDrawer}
            >
              <ExitToAppOutlinedIcon/>
            </IconButton>
          </ListItem>
          }
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
        size="large">
        <MenuIcon/>
      </IconButton>
    </div>
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
