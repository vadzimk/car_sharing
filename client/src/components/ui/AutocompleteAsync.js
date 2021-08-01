// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const  AutocompleteAsync=({label})=> {  // TODO configure this template
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }
    
    (async () => {
      //TODO CORS header ‘Access-Control-Allow-Origin’ missing
      const response = await axios.get('https://country.register.gov.uk/records.json?page-size=300');
      console.dir('response', response);
      
      await sleep(1e3); // For demo purposes.
      const countries = await response.data.json();
      
      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      }
    })();
    
    return () => {
      active = false;
    };
  }, [loading]);
  
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  
  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          fullWidth
          size='small'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteAsync;
