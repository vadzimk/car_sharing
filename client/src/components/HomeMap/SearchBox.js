/* eslint-disable no-unused-vars */

import React, {useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';

const SearchBox = ({
  optionlist,
  inputValue,
  onInputChange,
  value,
  onValueChange,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  
  const loading = open && options.length === 0;
  
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }
    
    if (active) {
      setOptions(optionlist);
    }
    
    return () => {
      active = false;
    };
  }, [loading, optionlist]);
  
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  
  console.log('optionlist', optionlist);
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      getOptionLabel={(option) => option.place_name}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(e, inputText) => onInputChange(inputText)}
      filterOptions={(x) => x}  // disables built-in filtering
      value={value}
      onChange={(e, newValue) => {
        console.log('selected value', newValue);
        onValueChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          placeholder="Where?"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
};

export default SearchBox;