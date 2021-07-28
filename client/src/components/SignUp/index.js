import React from 'react';
import {Form, Field, Formik} from 'formik';
import {TextField, DateField} from '../ui/FormField.js';

const SignUp = () => {
  
  const initialValues = {
    'first_name': '',
    'last_name': '',
    'dl_number': '',
    'dl_date': '',
    'countryid': '',
    'phone': '',
    'email': '',
    'password': '',
    'ishost': '',
  };
  
  const validate = () => {
    const errors = {};
    
    return errors;
  };
  
  const onSubmit = () => {
  
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({isValid, dirty}) => {
        return (
          <Form>
            <Field
              label="* First Name"
              name="first_name"
              component={TextField}
            />
            <Field
              label="* Last Name"
              name="last_name"
              component={TextField}
            />
            <Field
              label="* Drivers license"
              name="dl_number"
              component={TextField}
            />
            <Field
              label="* Date of issue"
              name="dl_date"
              component={DateField}
            />
            <button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!dirty || !isValid}
            >
              Sign up
            </button>
          </Form>
        );
      }
      }</Formik>
  
  );
};

export default SignUp;