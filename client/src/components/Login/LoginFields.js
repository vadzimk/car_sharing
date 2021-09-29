import React from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, TextField, Typography} from '@mui/material';

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
          <TextField
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
          <TextField
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
      
      </GridContainer>
    </Form>
  );
};

export default LoginFields;