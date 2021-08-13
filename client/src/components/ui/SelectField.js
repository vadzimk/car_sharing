import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
}));

const SelectField = (props) => {
  const classes = useStyles();
  
  return (
    <FormControl
      className={classes.formControl}
      error={props.error}
      size={props.size}
      name={props.name}
    >
      <InputLabel
        required={props.required}
      >
        {props.label}
      </InputLabel>
      <Select
        className={classes.select}
        value={props.value}
        onChange={event => props.onChange(event.target.value)}
      >
        <MenuItem value=""> </MenuItem>
        {
          props.options.map(option =>
            <MenuItem value={option} key={option}>{option}</MenuItem>,
          )
        }
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;