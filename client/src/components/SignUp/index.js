/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Formik} from 'formik';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';

import * as yup from 'yup';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import SignupFields from './SignupFields.js';

const useStyles = makeStyles(() => ({
  column: {
    marginBottom: '3em',
    width: '20em',
  },
  label: {
    marginLeft: 0,
    marginRight: '1em',
  },
  
}));

const SignUp = () => {
    const classes = useStyles();
    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down('xs'));
    
    const [countries, setCountries] = useState([]);
    
    const initialValues = {
      'first_name': '',
      'last_name': '',
      'dl_number': '',
      'dl_date': '',
      'countryid': '',
      'phone': '',
      'email': '',
      'password': '',
      'passwordConfirm': '',
      'ishost': '',
    };
    
    const validationSchema = yup.object().shape({
      first_name: yup.string().required('required'),
      last_name: yup.string().required('required'),
      dl_number: yup.string().required('required'),
      dl_date: yup.string().required('required'),
      countryid: yup.string().required('required'),
      phone: yup.string().required('required'),
      email: yup.string().required('required'),
      password: yup.string().required('required'),
      passwordConfirm: yup.string().required('required'),
    });
    
    const onSubmit = () => {
    
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
