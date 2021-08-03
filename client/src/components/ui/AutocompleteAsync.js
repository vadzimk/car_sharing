import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import userService from '../../services/user.js';

const AutocompleteAsync = ({
  label,
  value,
  name,
  error,
  helperText,
  setFieldValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  
  React.useEffect(async () => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }
    
    const countries = await userService.getAllCountries();
    
    if (active) {
      setOptions(countries);
    }
    
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
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name.toString().
        toLowerCase() === value.name?.toLowerCase()}
      getOptionLabel={(option) => option.name || ''}
      options={options}
      loading={loading}
      value={value}
      name={name}
      onChange={(e, value) =>
        setFieldValue(name, value)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          fullWidth
          size="small"
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20}/>:null}
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
