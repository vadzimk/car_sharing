import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SearchBox from './SearchBox.js';
import mapService from '../../services/mapService.js';

const noonFor = (date, n) => {
  const newDate = date.setDate(date.getDate() + n);
  const newDateStr = new Date(newDate).toDateString();
  return new Date(newDateStr + ' 12:00:00');
};
const SearchForm = () => {
  
  const [dateFrom, setDateFrom] = useState(noonFor(new Date(), 1));
  const [dateTo, setDateTo] = useState(noonFor(new Date(), 2));
  const [where, setWhere] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const handleWhereChange = (value) => {
    setWhere(value);
  };
  
  const handleSubmit = () => {
    // submits request to api with date range and bbox
    
  };
  
  
  
  useEffect(() => {
    const delayFn = setTimeout(async () => {
      console.log('where', where);
      // send request
      if (where && selectedFeature?.place_name !== where) {
        console.log(`${selectedFeature?.text.toLowerCase()} !== ${where.toLowerCase()}`, selectedFeature?.text.toLowerCase() !== where.toLowerCase());
        console.log('fetching', where);
        const features = await mapService.getGeoSearchResults(where);
        setOptions(features);
      }
    }, 2000);
    // clear options when cleared search box
    if(!where && options?.length){
      setOptions([]);
    }
    return () => clearTimeout(delayFn);
  }, [where]);
  
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