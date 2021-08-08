/* eslint-disable no-unused-vars */
import React from 'react';
import {Formik} from 'formik';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';

import * as yup from 'yup';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import SignupFields from './SignupFields.js';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../../reducers/userReducer.js';

const useStyles = makeStyles(() => ({
  column: {
    marginBottom: '3em',
    width: '20em',
  },
}));

const SignUp = () => {
    const classes = useStyles();
    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down('xs'));
    
    const initialValues = {
      'first_name': '',
      'last_name': '',
      'dl_number': '',
      'dl_date': '',
      'country': null,
      'phone': '',
      'email': '',
      'password': '',
      'passwordConfirm': '',
      'ishost': false,
    };
    // https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    
    const validationSchema = yup.object().shape({
      first_name: yup.string().required('required'),
      last_name: yup.string().required('required'),
      dl_number: yup.string().required('required'),
      dl_date: yup.date().max(new Date(), 'date must be in the past').
        required('required'),
      country: yup.mixed().test('country', 'country is required',
        async (value) => (value !== null && typeof value.name ===
          'string')),
      phone: yup.string().matches(phoneRegExp, 'invalid phone number').
        required('required'),
      email: yup.string().email().required('required'),
      password: yup.string().min(5).required('required'),
      passwordConfirm: yup.string().
        required('required').
        oneOf([yup.ref('password')], 'passwords do not match'),
    });
    
    const dispatch = useDispatch();
    
    const onSubmit = async (values) => {
      const newUser = {
        ...values,
        countryid: values.country.id,
      };
      delete newUser.country;
      dispatch(signUpUser(newUser));
    };
    
    return (
      <GridContainer direction="row" justifyContent="center">
        <GridItem className={classes.column}> {/*single column*/}
          <GridContainer direction="column" justifyContent="flex-start"
                         spacing={1}>
            <GridItem>
              <Typography variant="h5">Sign up</Typography>
            </GridItem>
            <GridItem>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                component={SignupFields}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    
    );
  }
;

export default SignUp;
