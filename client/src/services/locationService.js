import api from './api.js';

const getAllCountries = async () => {
  try {
    const res = await api.get('/user/countries');
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {
      success: false,
      error: e.message,
      data: [],
    };
  }
  
};

const getStatesForZip = async (zipcode) => {
  try {
    const res = await api.get('/user/states', {params:{zipcode}});
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    return {success: false, error: e.response.data.error};
  }
};

const getCityStateForZip = async (zipcode)=>{
  console.log('locationService.getCityStateForZip', zipcode);
  try{
    const res = await api.get('/user/data-for-zip', {params:{zipcode}});
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    return {success: false, error: e.response.data.error};
  
  }
};

const createLocation = async (newLocation) => {
  try {
    const res = await api.post('/location/add-location', {newLocation});
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.response.data.error};
  }
};

const locationService = {getAllCountries, createLocation, getStatesForZip, getCityStateForZip};
export default locationService;