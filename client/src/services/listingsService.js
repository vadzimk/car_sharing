import api from './api.js';

const create = async (newListing) => {
  try {
    
    const res = await api.put(
      '/listing/create', newListing,
    );
    
    return {
      success: res.status === 200,
      error: res.data.error?.message,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.message};
  }
};

const listingsService = {create};
export default listingsService;