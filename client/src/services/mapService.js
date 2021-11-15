import provider from '../leaflet/provider.js';

const getGeoSearchResults = async(where)=>{
  const {features} = await provider.geoCoder.geocode(where);
  return features;
};

export default {getGeoSearchResults};