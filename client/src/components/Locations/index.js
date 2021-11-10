import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import {GridContainer} from '../ui/GridRenamed.js';
import {
  deleteUserLocation,
  getUserLocations,
} from '../../reducers/locationReducer.js';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertDialog from '../ui/Dialogs/AlertDialog.js';
import InfoDialog from '../ui/Dialogs/InfoDialog.js';

const useStyles = makeStyles(() => ({
  baseCard: {
    width: '210px',
    height: '140px',
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
    backgroundColor: 'inherit',
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
  const listings = useSelector(state => state.listings);
  const history = useHistory();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: '', message: ''});
  const [dialogType, setDialogType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  useEffect(() => {
    dispatch(getUserLocations());
  }, [dispatch]);
  
  const handleAddLocation = () => {
    history.push('/locations/new');
  };
  
  const handleBinClick = (loc) => {
    setSelectedLocation(loc);
    setDialogContent({
      title: `Delete address ${selectedLocation?.addr_line1} ?`,
      message: 'This cannot be undone!',
    });
    setDialogType('alert');
    setDialogOpen(true);
  };
  
  const handleLocationDelete = () => {
    const listingsInLocation = listings.filter(
      item => item.location_id === selectedLocation.locationid);
    console.log('listingsInLocation', listingsInLocation);
    if (listingsInLocation.length) {
      // there is/are cars assigned to this location
      setDialogContent({
        title: `Cannot delete
          address "${selectedLocation?.addr_line1}"`,
        message: <div>
          <div>Move the following listings to another address first:</div>
          <List>
            {listingsInLocation.map(item => <ListItem key={item.id}>
              <ListItemText
              primary={`${item.make} ${item.model}`}
              secondary={`${item.plate}`}
              />
            </ListItem>)}
          </List>
        </div>,
      });
      setDialogType('info');
      setDialogOpen(true);
    } else {
      dispatch(deleteUserLocation(selectedLocation.locationid));
      setDialogOpen(false);
    }
  };
  
  const closeDialog = () => {
    setDialogOpen(false);
    setDialogContent({title: '', message: ''});
  };
  
  return (<>
      <AlertDialog
        isOpen={dialogOpen && dialogType === 'alert'}
        title={dialogContent.title}
        message={dialogContent.message}
        onAgree={handleLocationDelete}
        onCancel={closeDialog}
      />
      <InfoDialog
        isOpen={dialogOpen && dialogType === 'info'}
        title={dialogContent.title}
        message={dialogContent.message}
        onClose={closeDialog}
      />
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
          <button className={`${classes.baseCard} ${classes.addCard}`}
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
          </button>
          {locations.map(
            l => (
              <div
                key={l.locationid}
                className={`${classes.baseCard} ${classes.addressCard}`}
                data-cy="addressCard"
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
                    <IconButton
                      onClick={() => handleBinClick(l)}
                      data-cy="deleteButton"
                    >
                      <DeleteOutlineIcon/>
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </GridContainer>
    </>
  
  );
};

export default Locations;