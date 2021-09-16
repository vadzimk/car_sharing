import React from 'react';
import ListingForm from './ListingForm';
import {useLocation} from 'react-router-dom';

const EditListing=()=>{
  const {state} = useLocation();
  // TODO implement fetching images from AWS and passing them as props to initialValues of ListingForm , also used in Reservation
  return <ListingForm row={state}/>;
};
export default EditListing;