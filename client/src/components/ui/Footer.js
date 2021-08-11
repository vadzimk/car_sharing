import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {GridContainer, GridItem} from './GridRenamed.js';
import routes, {byLable} from '../../routes.js';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: 'auto',
    flexShrink: 0,
  },
  mainContainer: {
    padding: '0.7em',
  },
  link: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.text.primary,
  },
  girdColumn: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginLeft: '2rem',
    },
    
  },
}));



const Footer = () => {
  const classes = useStyles();
  
  const Column = ({items}) => (
    <GridItem xs={12} sm={3} lg={3}
              className={classes.girdColumn}> {/*level 1 rectangle*/}
      <GridContainer direction="column" justifyContent="center" spacing={1}>
        {
          items.map(item => (
            <GridItem component={Link} to={item.path} className={classes.link}
                      key={item.label}>
              {item.label}
            </GridItem>
          ))
        }
      </GridContainer>
    </GridItem>
  );
  
  const column1 = routes.filter(byLable(['Home', 'About', 'Team', 'Contact']));
  const column2 = routes.filter(
    byLable(['Renting', 'Policies', 'Terms', 'FAQ']));
  const column3 = routes.filter(
    byLable(['Hosting', 'List your car', 'Insurance', 'FAQ']));
  
  return (
    <footer className={classes.footer}>
      <GridContainer className={classes.mainContainer} justifyContent="center"
                     alignItems="center" spacing={2}>
        <Column items={column1}/>
        <Column items={column2}/>
        <Column items={column3}/>
      </GridContainer>
    </footer>
  );
};

export default Footer;
