import React from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {
  Button,
  TextField,
} from '@material-ui/core';
import SelectField from '../ui/SelectField.js';
import {SwitchLabeled} from '../ui/SwitchLabeled.js';

const EditListingFields = (props) => {
  
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem container direction="column" alignItems="stretch">
          <SelectField
            name="transmission"
            label="Transmission"
            required
            size="small"
            options={['Automatic', 'Manual']}
            value={props.values.transmission}
            error={Boolean(props.errors.transmission)}
            helperText={props.errors.transmission}
            onChange={(value) => props.setFieldValue('transmission', value)}
          />
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem container direction="column" alignItems="stretch">
          <SelectField
            name="category"
            label="Category"
            size="small"
            required
            options={[
              'Small',
              'Medium',
              'Large',
              'Estate',
              'Premium',
              'Minivan',
              'SUV']}
            value={props.values.category}
            error={Boolean(props.errors.category)}
            helperText={props.errors.category}
            onChange={(value) => props.setFieldValue('category', value)}
          />
        </GridItem>
        <GridItem>
          <TextField
            name="miles_per_rental"
            label="Miles/rental (unlimited : empty)"
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
        </GridItem>
        <GridItem>
          <SwitchLabeled
            name="active"
            label="Active"
            checked={props.values.active}
            onChange={(value) =>
              props.setFieldValue('active',
                value)}
          />
        </GridItem>
        
        {/*TODO add image upload*/}
        
        <GridItem container direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            disabled={!props.dirty || !props.isValid}
          >
            Upload Image
          </Button>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            disabled={!props.dirty || !props.isValid}
          >
            Cancel
          </Button>
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
    </Form>
  );
};

export default EditListingFields;