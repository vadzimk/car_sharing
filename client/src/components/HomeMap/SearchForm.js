import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import mapService from '../../services/mapService.js';
import {useDispatch} from 'react-redux';
import {getOffers} from '../../reducers/offersReducer.js';
import AutocompleteGeocode from '../ui/AutocompleteGeocode';

const noonFor = (date, n) => {
  const newDate = date.setDate(date.getDate() + n);
  const newDateStr = new Date(newDate).toDateString();
  return new Date(newDateStr + ' 12:00:00');
};
const SearchForm = ({map}) => {
  
  const [dateFrom, setDateFrom] = useState(noonFor(new Date(), 1));
  const [dateTo, setDateTo] = useState(noonFor(new Date(), 2));
  const [where, setWhere] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    // submit request to api with date range and bbox
    if (selectedFeature) {
      dispatch(getOffers(selectedFeature.bbox, dateFrom, dateTo));
    }
  };
  
  // navigates map to selectedFeature bbox
  useEffect(() => {
    if (map && selectedFeature) {
      const bounds = [
        selectedFeature.bbox.slice(0, 2).reverse(),
        selectedFeature.bbox.slice(2).reverse()];
      console.log('bounds', bounds);
      map.flyToBounds(bounds);
    }
  }, [map, selectedFeature]);
  
  return (
    <GridContainer
      direction="row"
      style={{marginBottom: '1rem'}}
      spacing={1}
    >
      <GridItem
        style={{flexGrow: 3, width: '250px'}}
      >
        <AutocompleteGeocode
          geoCodeFn={mapService.getGeoSearchResults}
          provider="maptiler"
          inputText={where}
          setInputText={setWhere}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
          textFieldProps={{placeholder:'Pick up location'}}
        />
      </GridItem>
      <GridItem
        style={{flexGrow: 1}}
      >
        <GridContainer className="second"
                       spacing={1}
        >
          <GridItem
            style={{flexGrow: 1}}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <GridContainer direction="row" spacing={1}
              >
                <GridItem
                  style={{flexGrow: 1, width: '230px'}}
                >
                  <DateTimePicker
                    views={['year', 'month', 'day', 'hours']}
                    autoOk={true}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="From"
                    value={dateFrom}
                    onChange={(date) => setDateFrom(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date time',
                    }}
                    renderInput={(params) => <TextField
                      fullWidth {...params} />}
                  />
                </GridItem>
                <GridItem
                  style={{flexGrow: 1, width: '230px'}}
                >
                  <DateTimePicker
                    views={['year', 'month', 'day', 'hours']}
                    autoOk={true}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="To"
                    value={dateTo}
                    onChange={(date) => setDateTo(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date time',
                    }}
                    renderInput={(params) => <TextField
                      fullWidth {...params} />}
                  />
                </GridItem>
              </GridContainer>
            </LocalizationProvider>
          </GridItem>
          <GridItem
            style={{
              flexGrow: 1,
              width: '64px',
            }}
          >
            <Button
              type="submit"
              aria-label="search"
              variant="contained"
              style={{height: '56px', width: '100%', borderColor: '#cbcbcb'}}
              color="secondary"
              onClick={handleSubmit}
            >
              <SearchIcon/>
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    
    </GridContainer>
  );
};

export default SearchForm;