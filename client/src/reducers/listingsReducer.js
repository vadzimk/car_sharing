import {setNotification} from './notificationReducer.js';
import listingsService from '../services/listingsService.js';

const listingsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_LISTING':
    return [...state, action.payload];
  case 'GET_HOST_LISTINGS':
    return [...action.payload];
  case 'UPDATE_LISTING':
    return state.map(
      r => r.id === action.payload.id ? {...r, ...action.payload}:r);
  case 'DELETE_LISTING':
    return state.filter(l => l.id !== action.payload);
  default:
    return state;
  }
};

export const updateListing = (rowToSubmit) => {
  return async (dispatch) => {
    const {success, error, data} = await listingsService.updateListing(
      rowToSubmit);
    if (success) {
      dispatch({
        type: 'UPDATE_LISTING',
        payload: data,
      });
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export const deleteListing = (id) => {
  return async (dispatch) => {
    const {success, error} = await listingsService.deleteListing(id);
    if (success) {
      dispatch({
        type: 'DELETE_LISTING',
        payload: id,
      });
    } else {
      dispatch(setNotification(error, 'error'));
    }
  };
};

export const getHostListings = (dateFrom, dateTo) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const {success, error, data} = await listingsService.getHostListings(
      dateFrom, dateTo);
    if (success) {
      dispatch({
        type: 'GET_HOST_LISTINGS',
        payload: data.listings,
      });
    }
    // else {
    //   dispatch(setNotification(error, 'error'));
    // }
  };
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
      dispatch({
        type: 'CREATE_LISTING',
        payload: data.listing,
      });
      for (let [key, url] of Object.entries(data.keysToUrls)) {
        const blobUrl = newListing.images.find(
          item => item.key === key).preview;
        try {
          
          // TODO for each response send file upload status to api
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