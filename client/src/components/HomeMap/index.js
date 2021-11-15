import React, {useState} from 'react';
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
  const [map, setMap] = useState(null);
  
  return (
    <GridContainer
      direction="column"
      justifyContent="flex-start"
      className={classes.container}
    >
      <GridItem>
        <SearchForm map={map}/>
      </GridItem>
      <GridItem style={{flexGrow: 1}}>
        <GridContainer
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.container}
        >
          <GridItem
          sm={6}
          sx={{
            display:{
              xs: 'none',
              sm: 'block'
            }
          }}
          >
            <Results/>
          </GridItem>
          <GridItem style={{flexGrow: 1}}
                    xs={12} sm={6}
          >
            <Map map={map} setMap={setMap}/>
          </GridItem>
        </GridContainer>
      </GridItem>
    
    </GridContainer>
  
  );
};

export default HomeMap;
