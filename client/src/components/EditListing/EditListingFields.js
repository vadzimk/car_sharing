import React from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {
  Button, makeStyles,
  TextField, Typography,
} from '@material-ui/core';
import SelectField from '../ui/SelectField.js';
import {SwitchLabeled} from '../ui/SwitchLabeled.js';
import Dropzone from '../Dropzone';

const useStyles = makeStyles((theme) => ({
  item: {
    marginLeft: '1em',
    marginRight: '1em',
    maxWidth: '25em',
  },
  title: {
    marginLeft: '1em',
    marginRight: '1em',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  
  hiddenTitle: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
  },
}));

const EditListingFields = (props) => {
  const classes = useStyles();
  
  return (
    <Form onSubmit={props.handleSubmit}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '100%',
          }}
    >
      <GridContainer
        style={{marginBottom: '3em'}}
        justifyContent="space-around" // TODO ???
      >
        <GridItem
          className={classes.item}
          xs={12}
          sm={6}
        >
          <Typography variant="h5">
            {props.title}
          </Typography>
          <TextField
            name="plate"
            label="Plate#"
            fullWidth
            size="small"
            required
            value={props.values.plate}
            error={Boolean(props.errors.plate)}
            helperText={props.errors.plate}
            onChange={props.handleChange}
          />
          <TextField
            name="make"
            label="Make"
            fullWidth
            size="small"
            required
            value={props.values['make']}
            error={Boolean(props.errors['make'])}
            helperText={props.errors['make']}
            onChange={props.handleChange}
          />
          <TextField
            name="model"
            label="Model"
            fullWidth
            size="small"
            required
            value={props.values.model}
            error={Boolean(props.errors.model)}
            helperText={props.errors.model}
            onChange={props.handleChange}
          />
          <TextField
            name="year"
            label="Year"
            fullWidth
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 1900,
                max: new Date().getFullYear(),
              },
            }}
            required
            value={props.values.year}
            error={Boolean(props.errors.year)}
            helperText={props.errors.year}
            onChange={props.handleChange}
          />
          <SelectField
            name="transmission"
            label="Transmission"
            required
            size="small"
            options={props.options.transmissionOptions}
            value={props.values.transmission}
            error={Boolean(props.errors.transmission)}
            helperText={props.errors.transmission}
            onChange={(value) => props.setFieldValue('transmission', value)}
          />
          <TextField
            name="seat_number"
            label="Seat#"
            fullWidth
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
                max: 100,
              },
            }}
            required
            value={props.values.seat_number}
            error={Boolean(props.errors.seat_number)}
            helperText={props.errors.seat_number}
            onChange={props.handleChange}
          />
          <TextField
            name="large_bags_number"
            label="Large Bags#"
            fullWidth
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
                max: 100,
              },
            }}
            required
            value={props.values.large_bags_number}
            error={Boolean(props.errors.large_bags_number)}
            helperText={props.errors.large_bags_number}
            onChange={props.handleChange}
          />
          <SelectField
            name="category"
            label="Category"
            size="small"
            required
            options={props.options.categoryOptions}
            value={props.values.category}
            error={Boolean(props.errors.category)}
            helperText={props.errors.category}
            onChange={(value) => props.setFieldValue('category', value)}
          />
          <TextField
            name="miles_per_rental"
            label="Miles/rental (empty - unlimited)"
            fullWidth
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 10,
                step: 10,
              },
            }}
            value={props.values.miles_per_rental}
            error={Boolean(props.errors.miles_per_rental)}
            helperText={props.errors.miles_per_rental}
            onChange={props.handleChange}
          />
          <SwitchLabeled
            name="active"
            label="Active"
            checked={props.values.active}
            onChange={(value) =>
              props.setFieldValue('active',
                value)}
          />
        
        </GridItem>
        <GridItem
          className={classes.item}
          xs={12}
          sm={6}
        >
          <Typography
            variant="h5"
            className={`${classes.title} ${classes.hiddenTitle}`}
          >
            &zwnj;
          </Typography>
          <Dropzone
            name="previews"
            handleError={props.handleError}
          />
          
          <GridItem
          >
            <GridContainer
              direction="row"
              justifyContent="flex-end"
              spacing={4}
              style={{marginTop: '1em', marginBottom: '1em'}}
            >
              
              <GridItem>
                <Button
                  type="reset"
                  color="primary.light"
                  variant="contained"
                  size="small"
                  disabled={!props.dirty || !props.isValid}
                >
                  Cancel
                </Button>
              </GridItem>
              <GridItem>
                
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="small"
                  disabled={!props.dirty || !props.isValid}
                >
                  Submit
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        
        </GridItem>
      </GridContainer>
    </Form>
  );
};

export default EditListingFields;