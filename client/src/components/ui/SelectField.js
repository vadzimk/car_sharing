import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  // makeStyles,
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const SelectField = (props) => {
  // const classes = useStyles();
  
  return (
    <FormControl
      // className={classes.formControl}
      error={props.error}
      size={props.size}
    >
      <InputLabel required={props.required}>{props.label}</InputLabel>
      <Select
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