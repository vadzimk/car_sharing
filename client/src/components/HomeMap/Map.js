import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import provider from '../../leaflet/provider.js';

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

  useEffect(() => {
    const handleResize = ()=>{
      setWindowHeight(window.innerHeight);
      setHeight(ref.current.clientHeight);
    };
    setHeight(ref.current.clientHeight);
  
    window.addEventListener('resize', handleResize);
      
      return ()=>{
        window.removeEventListener('resize', handleResize);
      };
  });
  
  console.log('height', height);
  
  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState({lat: 51.505, lng: -0.09});
  
  
  // overflow hidden with 100vh hides the attribution line and the bottom of the map
  // but solves the question of resizing the window
  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  // maybe anchor it at the bottom right corner
  return (
    <div ref={ref} style={{height: '100%', width: '100%'}}>
      <div style={{height:`${height}px`, width: '100%'}}>
        {height && <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{width: '100%', height: '100%'}}
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