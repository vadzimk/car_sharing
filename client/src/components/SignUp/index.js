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
      <GridContainer direction="row" justifyContent='center'>
        <GridItem> {/*single column*/}
          <GridContainer direction="column" justifyContent='flex-start'>
            <GridItem>
              <Typography variant="h4">Sign up</Typography>
            </GridItem>
            <GridItem>
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
                                     alignItems="stretch"
                                     spacing={1}
                      >
                        
                        
                        <GridItem>
                          <TextField
                            // label="First Name"
                            name="first_name"
                            fullWidth
                            // InputLabelProps={{disabled:true}}
                            required
                            error={errors.first_name}
                            helperText={errors.first_name}
                            onChange={handleChange}
                            
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Last Name"
                            name="last_name"
                            fullWidth
                            required
                            error={errors.last_name}
                            helperText={errors.last_name}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Drivers license"
                            name="dl_number"
                            fullWidth
                            required
                            error={errors.dl_number}
                            helperText={errors.dl_number}
                            onChange={handleChange}
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
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    
    );
  }
;

export default SignUp;
