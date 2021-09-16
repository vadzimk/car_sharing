import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Locations = () => {
  
  const locations = useSelector(state => state.user.locations);
  const history = useHistory();
  const handleAddLocation=()=>{
  history.push('/locations/new'); // TODO new location
  };
  return (
    <div>
      <h5>My locations</h5>
      <div>
        <div>
          <button onClick={handleAddLocation}>Add location</button>
        </div>
        {locations.map(
          l => (<div key={l.locationid}>`${l.addr_line1} ${l.addr_line2}`</div>))}
      </div>
    </div>
  );
};

export default Locations;