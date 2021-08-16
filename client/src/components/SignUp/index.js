import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import SignupFields from './SignupFields.js';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../../reducers/userReducer.js';
import {useHistory} from 'react-router-dom';
import {GridContainer} from '../ui/GridRenamed.js';

const SignUp = () => {
    
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
    const history = useHistory();
    const onSubmit = async (values) => {
      const newUser = {
        ...values,
        countryid: values.country.id,
      };
      delete newUser.country;
      dispatch(signUpUser(newUser, () => history.push('/login')));
      
    };
    
    return (
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
              <SignupFields {...formikProps}
                            title="Signup"
              />
            }
          </Formik>
        </GridContainer>
    );
  }
;

export default SignUp;
