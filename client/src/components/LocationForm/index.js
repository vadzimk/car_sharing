import React from 'react';
import {GridContainer} from '../ui/GridRenamed.js';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import LocationFields from './LocationFields.js';
import {createLocation} from '../../reducers/locationReducer.js';

const LocationForm = () => {
  const initialValues = {
    addr_line1: '',
    addr_line2: '',
    zipcode: '',
    city: '',
    state: '',
  };
  
  const validationSchema = yup.object().shape({
    addr_line1: yup.string().required('required'),
    zipcode: yup.number().typeError('invalid zip code').integer('invalid zip code').positive('invalid zip code').
      required('required').
      test('zipcode', 'must be 5 characters', val => {
        return val?.toString().length === 5;
      }),
  });
  
  const dispatch = useDispatch();
  
  const history = useHistory();
  const onSubmit = (values) => {
    console.dir('values', values);
    
    dispatch(createLocation(values,
      () => history.push('/locations'),
    ));
    
  };
  return (
    <GridContainer
      direction="row"
      justifyContent="center"
      style={{
        height: '100%',
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
    
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) =>
          <LocationFields {...formikProps} title="New Location"/>
        }
      </Formik>
    </GridContainer>
  );
};

export default LocationForm;