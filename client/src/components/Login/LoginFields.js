import React from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, TextField} from '@material-ui/core';

const LoginFields = (props) => {
  
  return (
    <Form onSubmit={props.handleSubmit}>
      <GridContainer
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
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
        </GridItem>
        <GridItem>
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