/* eslint-disable no-unused-vars */

import React from 'react';
import * as yup from 'yup';
import FormContainer from '../ui/FormContainer.js';
import {Formik} from 'formik';
import EditListingFields from './EditListingFields.js';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setNotification} from '../../reducers/notificationReducer.js';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Typography} from '@material-ui/core';

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
    previews: null, // for showing helperText only
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
  
  return (<>
            <Typography variant="h5">Listing</Typography>
    <GridContainer direction="row" justifyContent="center">
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        render={(formikProps) =>
          <EditListingFields
            {...formikProps}
            handleError={(e)=>dispatch(setNotification(e, 'error', ()=>{}))}
          />
        }
      />
      
    </GridContainer>
  </>
  );
};

export default EditListing;