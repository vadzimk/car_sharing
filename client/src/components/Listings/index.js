import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {useDispatch, useSelector} from 'react-redux';
import {getHostListings} from '../../reducers/listingsReducer.js';
import {Button, TextField} from '@mui/material';
import ListingTable from './ListingTable.js';
import {LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// TODO implement editing editable cells and dispatch action
// TODO implement editing editable location and dispatch action
const Listings = () => {
  const date = new Date();
  const [dateFrom, setDateFrom] = useState(new Date(date.getFullYear(), date.getMonth(), 1));
  const [dateTo, setDateTo] = useState(new Date());
  
  const history = useHistory();
  
  const handleNewListing = () => {
    history.push('/listings/new');
  };

  const dispatch = useDispatch();
  
  const hostListings = useSelector(state => state.listings);
  
  useEffect(() => {
    dispatch(getHostListings(dateFrom, dateTo));
  }, [dateFrom, dateTo]);
  
  
  // https://material-ui.com/components/data-grid/editing
  return (
    <GridContainer direction="column">
      <GridItem>
        <GridContainer direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <GridItem>
            <Button onClick={handleNewListing} variant="contained"
                    color="secondary">NEW LISTING</Button>
          </GridItem>
          <GridItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <GridContainer direction="row" spacing={1} justifyContent="flex-end">
              <GridItem
                style={{maxWidth: '180px'}}
              >
                <DatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="From"
                  value={dateFrom}
                  onChange={(date)=>setDateFrom(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </GridItem>
              <GridItem
                style={{maxWidth: '180px'}}
              >
                <DatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="To"
                  value={dateTo}
                  onChange={(date)=>setDateTo(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </GridItem>
              
            </GridContainer>
            </LocalizationProvider>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{height: 400, width: '100%'}}>
        <ListingTable
          rows={hostListings}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Listings;