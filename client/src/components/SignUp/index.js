/* eslint-disable no-unused-vars */
import React from 'react';
import {Form, Formik} from 'formik';
import {makeStyles, TextField, Typography} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import * as yup from 'yup';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: '550px',
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
      'countryid': '',
      'phone': '',
      'email': '',
      'password': '',
      'ishost': '',
    };
    
    const validationSchema = yup.object().shape({
      first_name: yup.string().required('required'),
    });
    
    const onSubmit = () => {
    
    };
    
    return (
      <div>
        <Typography variant="h4">Sign up</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {
            ({isValid, dirty, errors, handleChange}) => {
              console.dir('errors', errors);
              
              return (
                
                <GridContainer className={classes.mainContainer}
                               direction="column"
                               justifyContent="flex-start"
                               alignItems="center"
                >
                  
                  
                  <GridItem>
                    <TextField
                      label="First Name"
                      name="first_name"
                      required
                      error
                      helperText={errors.first_name}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem>
                    <TextField
                      label="* Last Name"
                      name="last_name"
                    />
                  </GridItem>
                  <GridItem>
                    <TextField
                      label="* Drivers license"
                      name="dl_number"
                    />
                  </GridItem>
                  <GridItem>
                    <KeyboardDatePicker
                      label="* Date of issue"
                      name="dl_date"
                      disableFuture
                      openTo="year"
                      format="dd/MM/yyyy"
                    />
                  </GridItem>
                  <GridItem>
                    <button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Sign up
                    </button>
                  </GridItem>
                </GridContainer>
              );
            }
          }
        </Formik>
      </div>
    
    );
  }
;

export default SignUp;
