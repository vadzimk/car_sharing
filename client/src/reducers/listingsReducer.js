import {setNotification} from './notificationReducer.js';
import listingsService from '../services/listingsService.js';

const listingsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_LISTING':
    return [...state, action.payload];
  
  case 'GET_ALL_LISTINGS':
    return [...state];
  
  default:
    return state;
  }
};

export const createListing = (newListing, onSuccess) => {
  return async (dispatch) => {
    const listingForApi = {
      ...newListing,
      images: newListing.images.map(i => i.key),
    };
    
    let imageKeys = [];
    const {success, error, data} = await listingsService.create(listingForApi);
    
    if (success) {
      // TODO for each response send file upload status to api
      dispatch({
        type: 'CREATE_LISTING',
        payload: data.listing,
      });
      for (let [key, url] of Object.entries(data.keysToUrls)) {
        const blobUrl = newListing.images.find(
          item => item.key === key).preview;
        try {
          
          const res = await listingsService.sendImage(url, blobUrl, key);
          console.log('listingsReducer res:', res.config.data.name);
          imageKeys.push(res.config.data.name);
          
        } catch (e) {
          console.log('listingReducer error', e);
          dispatch(setNotification(`error uploading ${newListing.images.find(
            i => i.key === key).path} ${key}`, 'error'));
        }
      }
      
      onSuccess();
      console.dir('createListing data:', data);
      dispatch(setNotification(`Created: ${data.listing.plate}`, 'success'));
    } else {
      dispatch(setNotification(error, 'error'));
    }
    
    if (imageKeys.length) {
      try {
        await listingsService.confirmImagesSent(data.listing.id, imageKeys);
      } catch (e) {
        console.log('error uploading images', e.message);
        dispatch(setNotification('error uploading images', 'error'));
      }
    }
    
  };
};

export default listingsReducer;