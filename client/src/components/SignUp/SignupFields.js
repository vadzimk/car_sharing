import React from 'react';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, makeStyles, TextField, Typography} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import AntSwitch from '../ui/AntSwitch.js';
import {Form} from 'formik';

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
  console.dir('errors', props.errors);
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
            autoFocus
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
            error={props.errors.last_name}
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
            error={props.errors.dl_number}
            helperText={props.errors.dl_number}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem>
          <KeyboardDatePicker
            label="Date of issue"
            name="dl_date"
            disableFuture
            required
            fullWidth
            size="small"
            value={null}
            placeholder="dd/MM/yyyy"
            openTo="year"
            format="dd/MM/yyyy"
            error={props.errors.first_name}
            helperText={props.errors.first_name}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem>
          <AutocompleteAsync label="Country"/> {/*TODO country chooser*/}
        </GridItem>
        <GridItem>
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            size="small"
            required
            error={props.errors.phone}
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
            error={props.errors.email}
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
            error={props.errors.password}
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
            error={props.errors.passwordConfirm}
            helperText={props.errors.passwordConfirm}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem
          className={classes.switch}> {/* TODO change to regular switch - not painting well*/}
          <Typography component="div">
            <GridContainer component="label" alignItems="center" spacing={1}
                           className={classes.switchLabel}>
              <GridItem>As Guest</GridItem>
              <GridItem>
                <AntSwitch defaultChecked={false} onChange={props.handleChange}
                           name="ishost"/>
              </GridItem>
              <GridItem>As Host</GridItem>
            </GridContainer>
          </Typography>
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
