/* eslint-disable no-unused-vars */

import React from 'react';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, makeStyles, TextField, Typography} from '@material-ui/core';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import {Form} from 'formik';
import {SwitchLabeledSym} from '../ui/SwitchLabeled.js';

const useStyles=makeStyles(()=>({
  title:{
    marginLeft: '1em',
    marginRight: '1em'
  },
 item:{
   marginLeft: '1em',
   marginRight: '1em',
   maxWidth: '20em'
 }
}));
const SignupFields = (props) => {
  const classes = useStyles();
  
  return (
    <Form onSubmit={props.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
    >
      <GridContainer
        // spacing={1}
        style={{marginBottom: '3em'}}
        justifyContent="space-between" // TODO ???

      >
        <GridItem
          xs={12}
          className={classes.title}
        >
          <Typography variant="h5">
            {props.title}
          </Typography>
        </GridItem>
        <GridItem
          xs={12}
          sm={6}
          className={classes.item}
        >
          <TextField
            name="first_name"
            label="First Name"
            fullWidth
            size="small"
            required
            value={props.values.first_name}
            error={Boolean(props.errors.first_name)}
            helperText={props.errors.first_name}
            onChange={props.handleChange}
          />
          <TextField
            label="Last Name"
            name="last_name"
            fullWidth
            size="small"
            required
            value={props.values.last_name}
            error={Boolean(props.errors.last_name)}
            helperText={props.errors.last_name}
            onChange={props.handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            size="small"
            required
            value={props.values.email}
            error={Boolean(props.errors.email)}
            helperText={props.errors.email}
            onChange={props.handleChange}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            size="small"
            required
            type="password"
            value={props.values.password}
            error={Boolean(props.errors.password)}
            helperText={props.errors.password}
            onChange={props.handleChange}
          />
          <TextField
            label="Confirm password"
            name="passwordConfirm"
            fullWidth
            size="small"
            required
            type="password"
            value={props.values.passwordConfirm}
            error={Boolean(props.errors.passwordConfirm)}
            helperText={props.errors.passwordConfirm}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={6}
          className={classes.item}

        >
          <TextField
            label="Drivers license"
            name="dl_number"
            fullWidth
            size="small"
            required
            value={props.values.dl_number}
            error={Boolean(props.errors.dl_number)}
            helperText={props.errors.dl_number}
            onChange={props.handleChange}
          />
          <TextField
            label="Date of issue"
            name="dl_date"
            variant="standard"
            type='date'
            required
            fullWidth
            size="small"
            placeholder="mm/dd/yyyy"
            InputLabelProps={{ shrink: true }}
            value={props.values.dl_date || ''}
            error={Boolean(props.errors.dl_date)}
            helperText={props.errors.dl_date}
            onChange={event => {
              props.setFieldValue('dl_date', event.target.value  || '');
            }}
          />
          <AutocompleteAsync label="Country"
                             name="country"
                             value={props.values.country}
                             error={Boolean(props.errors.country)}
                             helperText={props.errors.country}
                             onChange={value=>props.setFieldValue('country', value)}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            size="small"
            required
            value={props.values.phone}
            error={Boolean(props.errors.phone)}
            helperText={props.errors.phone}
            onChange={props.handleChange}
          />
          <SwitchLabeledSym
            labelLeft="As Guest"
            labelRight="As Host"
            name='ishost'
            value={props.values.ishost}
            onChange={value=>props.setFieldValue('ishost', value)}
          />
          <GridContainer
            direction="row"
            justifyContent="flex-end"
            spacing={3}
            style={{marginTop: '1em', marginBottom: '1em'}}
          >
            <GridItem>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={!props.dirty || !props.isValid}
            style={{alignContent:'flex-end'}}
          >
            Sign up
          </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Form>
  );
};

export default SignupFields;
