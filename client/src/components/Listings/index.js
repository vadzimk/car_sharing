import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {useDispatch, useSelector} from 'react-redux';
import {getHostListings} from '../../reducers/listingsReducer.js';
import {Button, TextField} from '@mui/material';
import ListingTable from './ListingTable.js';
import {LocalizationProvider, DatePicker} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=>({
  newListingButton:{
    margin: '8px',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
    },
    [theme.breakpoints.up('sm')]:{
      width: '180px'
    }
  }
}));

const Listings = () => {
  const classes = useStyles();
  const date = new Date();
  const [dateFrom, setDateFrom] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1));
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
        <GridContainer direction="row" justifyContent="space-between"
                       alignItems="center" spacing={1}>
          <GridContainer style={{flexGrow: 3, width: '180px'}} justifyContent="space-between">
            <GridItem style={{width: '180px', flexGrow: 1}}>
              <Button onClick={handleNewListing} variant="contained"
                      color="secondary"
                      className={classes.newListingButton}
              >
                NEW LISTING
              </Button>
            </GridItem>
            <GridItem style={{width: '180px', flexGrow:1}}></GridItem>
          </GridContainer>
          <GridItem style={{flexGrow: 1}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <GridContainer direction="row" spacing={1}
                             justifyContent="flex-end">
                <GridItem
                  style={{flexGrow: 1, width: '180px'}}
                >
                  <DatePicker
                    autoOk={true}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="From"
                    value={dateFrom}
                    onChange={(date) => setDateFrom(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    renderInput={(params) => <TextField
                      fullWidth {...params} />}
                  />
                </GridItem>
                <GridItem
                  style={{flexGrow: 1, width: '180px'}}
                >
                  <DatePicker
                    autoOk={true}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="To"
                    value={dateTo}
                    onChange={(date) => setDateTo(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    renderInput={(params) => <TextField
                      fullWidth {...params} />}
                  />
                </GridItem>
              
              </GridContainer>
            </LocalizationProvider>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{
        width: '100%'}}
      >
        <ListingTable
          rows={hostListings}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Listings;