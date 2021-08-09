import React from 'react';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, makeStyles, TextField} from '@material-ui/core';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import {Form} from 'formik';
import {SwitchLabeledSym} from '../ui/SwitchLabeled.js';

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
        </GridItem>
        <GridItem>
          <AutocompleteAsync label="Country"
                             name="country"
                             value={props.values.country}
                             error={Boolean(props.errors.country)}
                             helperText={props.errors.country}
                             onChange={value=>props.setFieldValue('country', value)}
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
            type="password"
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
            type="password"
            value={props.values.passwordConfirm}
            error={Boolean(props.errors.passwordConfirm)}
            helperText={props.errors.passwordConfirm}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem
          className={classes.switch}>
          <SwitchLabeledSym
            labelLeft="As Guest"
            labelRight="As Host"
            name='ishost'
            value={props.values.ishost}
            onChange={value=>props.setFieldValue('ishost', value)}
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
