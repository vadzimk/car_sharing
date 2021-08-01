/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import {
  FormControl, FormControlLabel, InputLabel,
  makeStyles,
  TextField,
  Typography,
  Switch,
  Button
} from '@material-ui/core';

import {Autocomplete} from '@material-ui/lab';

import {KeyboardDatePicker} from '@material-ui/pickers';
import * as yup from 'yup';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import AntSwitch from '../ui/AntSwitch.js';


const useStyles = makeStyles((theme) => ({
  column: {
   marginBottom:'3em',
    width: '20em',
  },
  label: {
    marginLeft: 0,
    marginRight: '1em',
  },
  switch:{
    height: '46px',
  },
  switchLabel:{
    marginTop: '0.5em',
    color: theme.palette.grey['800'],
  }
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
              >
                {
                  ({isValid, dirty, errors, handleChange}) => {
                    console.dir('errors', errors);
                    
                    return (
                      
                      <GridContainer
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={1}
                      >
                        <GridItem>
                          <TextField
                            name="first_name"
                            label="First Name"
                            fullWidth
                            size='small'
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
                            size='small'
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
                            size='small'
                            required
                            error={errors.dl_number}
                            helperText={errors.dl_number}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <KeyboardDatePicker
                            label="Date of issue"
                            name="dl_date"
                            disableFuture
                            required
                            fullWidth
                            size='small'
                            value={null}
                            placeholder="dd/MM/yyyy"
                            openTo="year"
                            format="dd/MM/yyyy"
                            error={errors.first_name}
                            helperText={errors.first_name}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <AutocompleteAsync label='Country'/> {/*TODO country chooser*/}
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Phone"
                            name="phone"
                            fullWidth
                            size='small'
                            required
                            error={errors.phone}
                            helperText={errors.phone}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            size='small'
                            required
                            error={errors.email}
                            helperText={errors.email}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Password"
                            name="password"
                            fullWidth
                            size='small'
                            required
                            error={errors.password}
                            helperText={errors.password}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            label="Confirm password"
                            name="passwordConfirm"
                            fullWidth
                            size='small'
                            required
                            error={errors.passwordConfirm}
                            helperText={errors.passwordConfirm}
                            onChange={handleChange}
                          />
                        </GridItem>
                        <GridItem className={classes.switch}>
                          <Typography component="div">
                            <GridContainer component="label" alignItems="center" spacing={1} className={classes.switchLabel}>
                              <GridItem>As Guest</GridItem>
                              <GridItem>
                                <AntSwitch defaultChecked={false} onChange={handleChange} name="ishost" />
                              </GridItem>
                              <GridItem>As Host</GridItem>
                            </GridContainer>
                          </Typography>
                        </GridItem>
                        <GridItem container justifyContent='flex-end'>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            disabled={!dirty || !isValid}
                          >
                            Sign up
                          </Button>
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
