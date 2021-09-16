import React, {useEffect} from 'react';
import {Form} from 'formik';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {Button, TextField, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCityState,
  getCityStateForZip,
} from '../../reducers/locationReducer.js';

const LocationFields = (props) => {
  const {city, state} = useSelector(
    state => state.location.zip_city_state);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (props.touched.zipcode && !props.errors.zipcode) {
      dispatch(getCityStateForZip(props.values.zipcode));
    } else {
      dispatch(clearCityState());
    }
  }, [props.touched.zipcode, props.errors.zipcode]);
  
  useEffect(() => {
    if (props.touched.zipcode &&
      props.values.city !== city) {
      props.setFieldValue('city', city);
      props.setFieldValue('state', state);
    }
  }, [city, props.touched.zipcode]);
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
            name="addr_line1"
            label="Street Address"
            fullWidth
            size="small"
            required
            value={props.values.addr_line1}
            error={Boolean(props.errors.addr_line1)}
            helperText={props.errors.addr_line1}
            onChange={props.handleChange}
          />
          <TextField
            name="addr_line2"
            label="Apt, Unit, etc."
            fullWidth
            size="small"
            value={props.values.addr_line2}
            error={Boolean(props.errors.addr_line2)}
            helperText={props.errors.addr_line2}
            onChange={props.handleChange}
          />
          <TextField
            name="zipcode"
            label="Zip code"
            fullWidth
            size="small"
            required
            value={props.values.zipcode}
            error={Boolean(props.errors.zipcode)}
            helperText={props.errors.zipcode}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <TextField
            name="city"
            label="City"
            fullWidth
            disabled
            size="small"
            value={props.values.city || ''}
            onChange={props.handleChange}
          
          />
          {/*TODO refactor to use for city and state*/}
          <TextField
            name="state"
            label="State"
            fullWidth
            disabled
            size="small"
            value={props.values.state || ''}
            onChange={props.handleChange}
          
          />
        
        </GridItem>
        <GridItem container justifyContent="flex-end">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={!props.dirty || !props.isValid || !city}
          >
            Submit
          </Button>
        </GridItem>
      
      </GridContainer>
    </Form>
  );
};

export default LocationFields;