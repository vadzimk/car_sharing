import React, {useEffect} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import LoginFields from './LoginFields.js';
import {loginUser} from '../../reducers/userReducer.js';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {GridContainer} from '../ui/GridRenamed.js';

const Login = () => {
  
  const initialValues = {
    email: '',
    password: '',
  };
  
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().required('required'),
  });
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  
  useEffect(() => {
      if (user) {
        history.push(user?.ishost ? '/listings':'/');
      }
    },[user]
  );
  
  const onSubmit = (values) => {
    dispatch(loginUser(values));
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
          <LoginFields {...formikProps} title="Login"/>
        }
      </Formik>
    </GridContainer>
  );
};

export default Login;