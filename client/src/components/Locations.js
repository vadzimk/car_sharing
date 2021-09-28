import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    width: '100px',
    height: '100px',
    border: '1px solid black',
  },
  container: {
    display: 'flex',
  },
}));

const Locations = () => {
  const classes = useStyles();
  const locations = useSelector(state => state.location.myLocations);
  const history = useHistory();
  
  const handleAddLocation = () => {
    history.push('/locations/new');
  };
  
  return (
    <div>
      <h5>My locations</h5>
      <div className={classes.container}>
        <div className={classes.card}>
          <button onClick={handleAddLocation}>Add location</button>
        </div>
        {locations.map(
          l => (
            <div
              key={l.locationid}
              className={classes.card}
            >
              {l.addr_line1} ${l.addr_line2}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Locations;