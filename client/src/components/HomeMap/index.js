import React from 'react';
import Map from './Map.js';
import {makeStyles} from '@mui/styles';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import Results from './Results.js';
import SearchForm from './SearchForm.js';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    
  },
}));

const HomeMap = () => {
  const classes = useStyles();
  
  return (
    <GridContainer
      direction="column"
      justifyContent="flex-start"
      className={classes.container}
    >
      <GridItem>
        <SearchForm/>
      </GridItem>
      <GridItem style={{flexGrow: 1}}>
        <GridContainer
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.container}
        >
          <GridItem xs={12} sm={6} style={{minWidth: '400px'}}>
            <Results/>
          </GridItem>
          <GridItem style={{flexGrow: 1}}>
            <Map/>
          </GridItem>
        </GridContainer>
      </GridItem>
    
    </GridContainer>
  
  );
};

export default HomeMap;
