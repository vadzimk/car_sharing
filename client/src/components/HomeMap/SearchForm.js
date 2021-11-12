import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SearchBox from './SearchBox.js';
import mapService from '../../services/mapService.js';
import {area, bboxPolygon} from '@turf/turf';

const noonFor = (date, n) => {
  const newDate = date.setDate(date.getDate() + n);
  const newDateStr = new Date(newDate).toDateString();
  return new Date(newDateStr + ' 12:00:00');
};
const SearchForm = ({map}) => {
  
  const [dateFrom, setDateFrom] = useState(noonFor(new Date(), 1));
  const [dateTo, setDateTo] = useState(noonFor(new Date(), 2));
  const [where, setWhere] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const handleWhereChange = (value) => {
    setWhere(value);
  };
  
  const handleSubmit = () => {
    // submit request to api with date range and bbox
    
  };
  
  const searchQueryChanged = selectedFeature?.text.toLowerCase() !==
    where.toLowerCase();
  const searchQueryIsFeature = options.find(
    option => option.place_name.toLowerCase() === where.toLowerCase());
  // fetch options
  useEffect(() => {
    const delayFn = setTimeout(async () => {
      console.log('where', where);
      // send request
      if (where && searchQueryChanged && !searchQueryIsFeature) {
        console.log('fetching', where);
        const features = await mapService.getGeoSearchResults(where);
        features.sort((a, b) => (
          area(bboxPolygon(b.bbox)) - area(bboxPolygon(a.bbox))
        ));
        setOptions(features);
      }
    }, 500);
    
    return () => clearTimeout(delayFn);
  }, [where, searchQueryChanged, searchQueryIsFeature]);
  
  // clear options when cleared search box
  useEffect(() => {
    
    if (options.length && !where) {
      setOptions([]);
    }
  }, [where, options]);
  
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
        <SearchBox
          optionlist={options}
          inputValue={where}
          onInputChange={handleWhereChange}
          value={selectedFeature}
          onValueChange={setSelectedFeature}
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