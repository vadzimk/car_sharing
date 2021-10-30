import api from './api.js';
import axios from 'axios';

const create = async (newListing) => {
  try {
    
    const res = await api.post(
      '/listing/create', newListing,
    );
    
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.response.data.error};
  }
};

const getHostListings = async (dateFrom, dateTo) => {
  try {
    const res = await api.get('/listing/get-host-listings',
      {params: {dateFrom, dateTo}});
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (e) {
    console.log('caught error', e);
    return {success: false, error: e.response.data.error};
  }
};

// https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689

// https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html
// https://stackoverflow.com/questions/11876175/how-to-get-a-file-or-blob-from-an-object-url
const sendImage = async (url, blobUrl, filename) => {
  console.log('blobUrl', blobUrl);
  let file = await fetch(blobUrl).
    then(r => r.blob()).
    then(blobFile => new File([blobFile], filename, {type: 'image/*'}));
  
  console.log('file.type', file.type);
  // not using the api axios instance here bc it contains authorization header
  const res = await axios.put(url, file, {
    headers: {
      'content-type': file.type,
    },
  });
  console.log('sendImage res:', res);
  return res;
};

/**
 * @body key[]
 * */
const confirmImagesSent = async (listingId, keys) => {
  await api.post('/listing/imagekeys', {listingId, keys});
};

// eslint-disable-next-line no-unused-vars
const updateListing = async (rowToSubmit) => {
  try {
    const res = await api.put('/listing/update-listing', rowToSubmit);
    return {
      success: res.status === 200,
      data: res.data.listing_update,
    };
  } catch (e) {
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};

const deleteListing = async (id) => {
  const listing = {id};
  try {
    const res = await api.delete('/listing/delete-host-listing',
      {data: listing});
    return {success: res.status === 204};
  } catch (e) {
    return {
      success: false,
      error: e.response.data.error,
    };
    
  }
};
  
  const listingsService = {
    create,
    sendImage,
    confirmImagesSent,
    getHostListings,
    updateListing,
    deleteListing,
  };
  export default listingsService;