import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {useDispatch, useSelector} from 'react-redux';
import {getHostListings} from '../../reducers/listingsReducer.js';
import {Button} from '@material-ui/core';
import ListingTable from './ListingTable.js';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Listings = () => {
  const date = new Date();
  const [dateFrom, setDateFrom] = useState(new Date(date.getFullYear(), date.getMonth(), 1));
  const [dateTo, setDateTo] = useState(new Date());
  
  const history = useHistory();
  
  const handleNewListing = () => {
    history.push('/listings/create');
  };
  
  const dispatch = useDispatch();
  const hostListings = useSelector(state => state.listings);
  useEffect(() => {
    dispatch(getHostListings());
  }, []);
  
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridContainer direction="row" spacing={1} >
              <GridItem style={{maxWidth: '150px'}} >
                <KeyboardDatePicker
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
                />
              </GridItem>
              <GridItem style={{maxWidth: '150px'}}>
                <KeyboardDatePicker
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
                />
              </GridItem>
              
            </GridContainer>
            </MuiPickersUtilsProvider>
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