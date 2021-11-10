import provider from '../leaflet/provider.js';

// TODO this function will do something else
const getMapResults = async(where) => {
  const results = await provider.geoCoder.geocode(where);
  return {
    success: true,
    data: results.features,
  };
};


const getGeoSearchResults = async(where)=>{
  const {features} = await provider.geoCoder.geocode(where);
  return features;
};

export default {getMapResults, getGeoSearchResults};