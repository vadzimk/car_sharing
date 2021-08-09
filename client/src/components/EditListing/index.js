/* eslint-disable no-unused-vars */

import React from 'react';
import * as yup from 'yup';
import FormContainer from '../ui/FormContainer.js';
import {Formik} from 'formik';
import EditListingFields from './EditListingFields.js';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const EditListing = () => {
  
  const initialValues = {
    plate: '',
    make: '',
    model: '',
    year: '',
    transmission: '', // TODO add constraint in db
    seat_number: '', // TODO add constraint in db
    large_bags_number: '', // TODO add constraint in db
    category: '',
    miles_per_rental: '', // TODO add constraint in db
    active: '',
  };
  
  // TODO validation
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().required('required'),
  });
  
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values) => {
  //TODO submit
  
  };
  
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        component={EditListingFields}
      />
    </FormContainer>
  );
};

export default EditListing;