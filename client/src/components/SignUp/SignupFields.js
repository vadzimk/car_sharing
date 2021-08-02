import React from 'react';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, makeStyles, TextField} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import {Form} from 'formik';
import SwitchLabeled from '../ui/SwitchLabeled.js';

const useStyles = makeStyles((theme) => ({
  switch: {
    height: '46px',
  },
  switchLabel: {
    marginTop: '0.5em',
    color: theme.palette.grey['800'],
  },
}));

const SignupFields = (props) => {
  const classes = useStyles();
  console.log('props', props);
  console.log('errors', props.errors);
  console.log('values', props.values);
  
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
            name="first_name"
            label="First Name"
            fullWidth
            size="small"
            required
            autoFocus
            value={props.values.first_name}
            error={Boolean(props.errors.first_name)}
            helperText={props.errors.first_name}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
          <KeyboardDatePicker
            label="Date of issue"
            name="dl_date"
            disableFuture
            autoOk
            variant="inline"
            required
            fullWidth
            size="small"
            value={props.values.dl_date}
            placeholder="dd/MM/yyyy"
            openTo="year"
            format="dd/MM/yyyy"
            error={Boolean(props.errors.dl_date)}
            helperText={props.errors.dl_date}
            onChange={val => {
              console.log('___', val);
              props.setFieldValue('dl_date', val);
            }}
            onError={(err, val)=>{
              console.log('err', err);
              console.log('val', val);
            }}
          />
        </GridItem>
        <GridItem>
          <AutocompleteAsync label="Country"
                             name="country"
                             value={props.values.country}
                             error={Boolean(props.errors.country)}
                             helperText={props.errors.country}
                             setFieldValue={props.setFieldValue}
          />
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
          <TextField
            label="Password"
            name="password"
            fullWidth
            size="small"
            required
            value={props.values.password}
            error={Boolean(props.errors.password)}
            helperText={props.errors.password}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Confirm password"
            name="passwordConfirm"
            fullWidth
            size="small"
            required
            value={props.values.passwordConfirm}
            error={Boolean(props.errors.passwordConfirm)}
            helperText={props.errors.passwordConfirm}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem
          className={classes.switch}>
          <SwitchLabeled
            labelLeft="As Guest"
            labelRight="As Host"
            handleChange={props.handleChange}
            value={props.values.ishost}
          />
        </GridItem>
        <GridItem container justifyContent="flex-end">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={!props.dirty || !props.isValid}
          >
            Sign up
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );
};

export default SignupFields;
