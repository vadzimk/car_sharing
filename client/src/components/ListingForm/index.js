/* eslint-disable no-unused-vars */

import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import ListingFormFields from './ListingFormFields.js';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setNotification} from '../../reducers/notificationReducer.js';
import {GridContainer} from '../ui/GridRenamed.js';
import {createListing} from '../../reducers/listingsReducer.js';

const ListingForm = ({row={}}) => {
  
  const transmissionOptions = ['Automatic', 'Manual'];
  const categoryOptions = [
    'Small',
    'Medium',
    'Large',
    'Estate',
    'Premium',
    'Minivan',
    'SUV'];
  
  const initialValues = {
    plate: row.plate || '',
    make: row.make || '',
    model: row.model || '',
    year: row.year || '',
    transmission: row.transmission ? transmissionOptions.find(i=>i[0]===row.transmission) : '', // TODO add constraint in db
    seat_number: row.seat_number || '', // TODO add constraint in db
    large_bags_number: row.large_bags_number || '', // TODO add constraint in db
    category: row.category || '',
    miles_per_rental: row.miles_per_rental || '', // TODO add constraint in db
    active: row.active || false,
    images: [], // {key, path, preview}
  };
  
  const validationSchema = yup.object().shape({
    plate: yup.string().required('required'),
    make: yup.string().required('required'),
    model: yup.string().required('required'),
    year: yup.number().
      min(1900, 'too old').
      max(new Date().getFullYear(), 'cannot be greater than current year').
      required('required'),
    transmission: yup.string().
      oneOf(transmissionOptions, 'not one of the options').
      required('required'),
    seat_number: yup.number().min(1).max(100).required('required'),
    large_bags_number: yup.number().min(0).max(100).required('required'),
    category: yup.string().
      oneOf(categoryOptions, 'not one of the options').
      required('required'),
    miles_per_rental: yup.number().min(1),
  });
  
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values) => {
    console.dir('values', values);

    dispatch(createListing(values,
      () => history.push('/listings'),
    ));
    
  };
  
  return (<>
      <GridContainer
        direction="row"
        justifyContent="center"
        style={{
          height: '100%',
          margin: 'auto',
          maxWidth: '60em'
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) =>
            <ListingFormFields
              {...formikProps}
              title="Listing"
              options={{transmissionOptions, categoryOptions}}
              handleError={(e) =>
                dispatch(setNotification(e, 'error', () => {
                }))}
            />
          }
        </Formik>
      
      </GridContainer>
    </>
  );
};

export default ListingForm;