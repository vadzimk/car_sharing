/* eslint-disable */
import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {makeStyles, Typography} from '@material-ui/core';
import LoginFields from './LoginFields.js';
import {loginUser} from '../../reducers/userReducer.js';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  column: {
    marginBottom: '3em',
    width: '20em',
    height: '35em',
  },
}));

const Login = () => {
  const classes = useStyles();
  
  const initialValues = {
    email: '',
    password: '',
  };
  
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().required('required'),
  });
  
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values) => {
    dispatch(loginUser(values, ()=>history.push('/')));
  };
  
  return (
    <GridContainer direction="row" justifyContent="center">
      <GridItem className={classes.column}>
        <GridContainer direction="column" justifyContent="flex-start"
                       spacing={1}>
          <GridItem>
            <Typography variant="h5">Login</Typography>
          </GridItem>
          <GridItem>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              component={LoginFields}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Login;