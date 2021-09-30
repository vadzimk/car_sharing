import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {IconButton, Typography} from '@mui/material';
import {GridContainer} from './ui/GridRenamed.js';
import {getUserLocations} from '../reducers/locationReducer.js';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {setNotification} from '../reducers/notificationReducer.js';

const useStyles = makeStyles(() => ({
  baseCard: {
    width: '150px',
    height: '150px',
    border: '1px gray',
    borderRadius: '10px',
    display: 'flex',
    margin: '0.5rem',
  },
  addCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  addressCard: {
    borderStyle: 'solid',
    flexDirection: 'column',
  },
  addressCardContent: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  container: {
    margin: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
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
  
  useEffect(() => {
    dispatch(getUserLocations());
  }, []);
  
  const handleAddLocation = () => {
    history.push('/locations/new');
  };
  
  const handleDeleteAddress = () => {
    // TODO implement delete location
    dispatch(setNotification('not implemented', 'warning'));
  };
  
  const handleEditAddress = () => {
    // TODO implement edit location
    dispatch(setNotification('not implemented', 'warning'));
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
              <div className={classes.addressCardContent}>
                <div>
                  <Typography>
                    {l.addr_line1}
                  </Typography>
                  <Typography>
                    {l.addr_line2}
                  </Typography>
                  <Typography>
                    {l.zipcode}
                  </Typography>
                </div>
                <div style={{alignSelf: 'flex-end'}}>
                  <IconButton onClick={handleEditAddress}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={handleDeleteAddress}>
                    <DeleteOutlineIcon/>
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
      </div>
    </GridContainer>
  );
};

export default Locations;