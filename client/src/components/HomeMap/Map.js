import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import provider from '../../leaflet/provider.js';
import L from 'leaflet';
import marker_icon_2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker_icon from 'leaflet/dist/images/marker-icon.png';
import marker_shadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker_icon_2x,
  iconUrl: marker_icon,
  shadowUrl: marker_shadow,
});

// const useStyles = makeStyles(() => ({
//   mapContainer: {
//     width: '100%',
//     minHeight: '100%',
//   },
// }));

const Map = () => {
  const [height, setHeight] = useState(0);
  const [, setWindowHeight] = useState(0); // watch window resize only
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState({lat: 37.090, lng: -95.712});
  const [map, setMap] = useState(null);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setHeight(ref.current.clientHeight);
    };
    
    setHeight(ref.current.clientHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    let userCoordinates;
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        userCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if(map){
          map.flyTo(userCoordinates, 10);
        }
        console.log('current position', userCoordinates);
      });
    }
  }, [map]);
  
  return (
    <div ref={ref} style={{height: '100%', width: '100%'}}>
      <div style={{height: `${height}px`, width: '100%'}}>
        {height &&
        <MapContainer
          center={center}
          zoom={3}
          scrollWheelZoom={false}
          style={{width: '100%', height: '100%'}}
          whenCreated={setMap}
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
        </MapContainer>}
      </div>
    
    </div>
  
  );
};

export default Map;