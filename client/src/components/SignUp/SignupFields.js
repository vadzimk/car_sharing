import React from 'react';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import AutocompleteAsync from '../ui/AutocompleteAsync.js';
import {Form} from 'formik';
import {SwitchLabeledSym} from '../ui/SwitchLabeled.js';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  item: {
    // marginLeft: '1em',
    // marginRight: '1em',
    maxWidth: '25em',
  },
  title: {
    // marginLeft: '1em',
    // marginRight: '1em',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  
  hiddenTitle: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },

  },
}));
const SignupFields = (props) => {
  const classes = useStyles();
  const countries = useSelector(state=>state.location.countries);
  return (
    <Form onSubmit={props.handleSubmit}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '100%'
          }}
    >
      <GridContainer
        style={{marginBottom: '3em'}}
        justifyContent="space-around" // TODO ???
        columnSpacing={3}
      >
        <GridItem
          className={classes.item}
          xs={12}
          sm={6}
        >
          <Typography
            variant="h5"
            className={classes.title}
          >
            {props.title}
          </Typography>
          <TextField
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
            variant="standard"
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
          <Typography variant="h5"
                      className={`${classes.title} ${classes.hiddenTitle}`}
          >
            &zwnj;
          </Typography>
          <TextField
            variant="standard"
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
            type="date"
            required
            fullWidth
            size="small"
            placeholder="mm/dd/yyyy"
            InputLabelProps={{shrink: true}}
            value={props.values.dl_date || ''}
            error={Boolean(props.errors.dl_date)}
            helperText={props.errors.dl_date}
            onChange={event => {
              props.setFieldValue('dl_date', event.target.value || '');
            }}
          />
          <AutocompleteAsync label="Country"
                             name="country"
                             optionlist={countries}
                             value={props.values.country}
                             error={Boolean(props.errors.country)}
                             helperText={props.errors.country}
                             onChange={value => props.setFieldValue('country',
                               value)}
          />
          <TextField
            variant="standard"
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
            name="ishost"
            value={props.values.ishost}
            onChange={value => props.setFieldValue('ishost', value)}
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
                style={{alignContent: 'flex-end'}}
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
