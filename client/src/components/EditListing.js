import React from 'react';
import ListingForm from './ListingForm';
import {useLocation} from 'react-router-dom';

const EditListing=()=>{
  const {state} = useLocation();
  // TODO implement fetching images from AWS and passing them as props to initialValues of ListingForm
  return <ListingForm row={state}/>;
};
export default EditListing;