import {Geocoder} from '@maptiler/geocoder';
export default {
    // this is not a secret https://support.maptiler.com/i722-protect-your-map-key
    url:'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=bPEJWbME340vCtM938RN',
    attribution:
      '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    geoCoder: new Geocoder({
        input: 'search',
        key: 'bPEJWbME340vCtM938RN' // api key
    }),

};

// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// url: 'https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=bPEJWbME340vCtM938RN',
