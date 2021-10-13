import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {makeStyles} from '@mui/styles';
import 'leaflet/dist/leaflet.css';
import provider from '../../leaflet/provider.js';

const useStyles = makeStyles(() => ({
  mapContainer: {
    width: '100%',
    height: '400px',
  },
}));

const Map = () => {
  const classes = useStyles();
  
  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState({lat:51.505, lng: -0.09});
  return (
    <div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution={provider.attribution}
          url={provider.url}
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;