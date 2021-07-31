import React from 'react';
import {makeStyles, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import routes, {byLable} from '../../routes.js';

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
  },
  mainContainer: {
    position: 'absolute',
    padding: '0.7em'
  },
  link: {
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black'
  },

}));

const GridContainer = (props) => <Grid container {...props}/>;
const GridItem = (props) => <Grid item {...props}/>;


const Footer =()=>{
  const classes = useStyles();
  
  const Column = ({items}) => (
    <GridItem > {/*level 1 rectangle*/}
      <GridContainer direction="column" justifyContent='center' spacing={1}>
        {
          items.map(item => (
            <GridItem component={Link} to={item.path} className={classes.link} key={item.label}>
              {item.label}
            </GridItem>
          ))
        }
      </GridContainer>
    </GridItem>
  );
  

  
  const column1 = routes.filter(byLable(['Home','About', 'Team', 'Contact']));
  const column2 = routes.filter(byLable(['Renting', 'Policies', 'Terms', 'FAQ']));
  const column3 = routes.filter(byLable(['Hosting', 'List your car', 'Insurance', 'FAQ']));
  
  return(
    <footer className={classes.footer}>
      <GridContainer className={classes.mainContainer} justifyContent="center" alignItems='center' spacing={10}>
        <Column items={column1}/>
        <Column items={column2}/>
        <Column items={column3}/>
      </GridContainer>
    </footer>
  );
};

export default Footer;
