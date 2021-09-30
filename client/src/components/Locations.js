import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {Typography} from '@mui/material';
import {GridContainer} from './ui/GridRenamed.js';
import {getUserLocations} from '../reducers/locationReducer.js';

const useStyles = makeStyles(() => ({
  baseCard: {
    width: '200px',
    height: '200px',
    border: '1px gray',
    borderRadius: '10px',
    display: 'flex',
 
  },
  addCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5rem',
    borderStyle: 'dashed',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  addressCard: {
    borderStyle: 'solid',
    flexDirection: 'column',
  },
  container: {
    margin: '1rem',
    display: 'flex',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Locations = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const locations = useSelector(state => state.location.userLocations);
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getUserLocations());
  }, []);
  
  const handleAddLocation = () => {
    history.push('/locations/new');
  };
  
  return (
    <GridContainer
      direction="column"
      justifyContent="flex-start"
      style={{
        height: '100%',
        margin: 'auto',
        maxWidth: '60em',
      }}
    >
      <Typography variant="h5">Your locations</Typography>
      <div className={classes.container}>
        <div className={`${classes.baseCard} ${classes.addCard}`}
             onClick={handleAddLocation}
        >
          <div
            className={classes.iconContainer}
          >
            <AddIcon
              sx={{fontSize: '4rem'}}
            />
            <Typography variant="h6">Add address</Typography>
          </div>
        </div>
        {locations.map(
          l => (
            <div
              key={l.locationid}
              className={`${classes.baseCard} ${classes.addressCard}`}
            >
              <Typography paragraph>
                {l.addr_line1}
              </Typography>
              <Typography paragraph>
                {l.addr_line2}
              </Typography>
              <Typography paragraph>
                {l.zipcode}
              </Typography>
            </div>
          ))}
      </div>
    </GridContainer>
  );
};

export default Locations;