import React from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const LoginFields = (props) => {
  
  return (
    <Form onSubmit={props.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
    >
      <GridContainer direction="column"
                     spacing={3}
                     style={{maxWidth: '20em'}}
      >
        <GridItem>
          <Typography variant="h5">
            {props.title}
          </Typography>
        </GridItem>
        <GridItem>
          <GridContainer direction="column"
                         // spacing={1}
          >
            <GridItem>
              <TextField
                variant="standard"
                name="email"
                label="email"
                fullWidth
                size="small"
                required
                value={props.values.email}
                error={Boolean(props.errors.email)}
                helperText={props.errors.email}
                onChange={props.handleChange}
              />
            </GridItem>
            <GridItem>
              <TextField
                variant="standard"
                name="password"
                label="password"
                fullWidth
                size="small"
                required
                type="password"
                value={props.values.password}
                error={Boolean(props.errors.password)}
                helperText={props.errors.password}
                onChange={props.handleChange}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem container justifyContent="flex-end">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={!props.dirty || !props.isValid}
          >
            Login
          </Button>
        </GridItem>
        <GridItem>
          <Typography variant="p">Don&apos;t have an account? </Typography>
          <Link to={'/signup'}>Sign up</Link>
        </GridItem>
      
      </GridContainer>
    </Form>
  );
};

export default LoginFields;