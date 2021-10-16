import React from 'react';
import Map from './Map.js';
import {makeStyles} from '@mui/styles';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';

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
        justifyContent="space-between"
        alignItems="stretch"
        className={classes.container}
      >
        <GridItem >
          images
        </GridItem>
        <GridItem style={{flexGrow: 1}}>
          <Map/>
        </GridItem>
      </GridContainer>

  );
};

export default HomeMap;