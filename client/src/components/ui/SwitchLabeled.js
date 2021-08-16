import {GridContainer, GridItem} from './GridRenamed.js';
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';

export const SwitchSecondary = withStyles(theme => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked + $track': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  checked: {},
  track: {},
  thumb: {
    color: theme.palette.primary.main,
  },
}))(Switch);

const useStyles = makeStyles((theme) => ({
  switch: {
    height: '46px',
  },
  switchLabel: {
    marginTop: '0.5em',
    color: theme.palette.grey['800'],
  },
  label: {
    color: theme.palette.grey['800'],
  },
}));

export const SwitchLabeledSym = ({
  labelLeft,
  labelRight,
  name,
  onChange,
  value,
}) => {
  const classes = useStyles();
  
  return (
    <Typography component="div">
      <GridContainer component="label" alignItems="center" spacing={1}
                     className={classes.switchLabel}>
        <GridItem>{labelLeft}</GridItem>
        <GridItem>
          <SwitchSecondary defaultChecked={false}
                           name={name}
                           value={value}
                           onChange={(e) =>
                             onChange(e.target.checked)
                           }
          />
        </GridItem>
        <GridItem>{labelRight}</GridItem>
      </GridContainer>
    </Typography>
  );
};

export const SwitchLabeled = (props) => {
  const classes = useStyles();
  
  return (
    <FormControl
      style={{
        width: '100%',
        marginTop: '16px',
        marginBottom: '16px',
      }}
    >
      <FormControlLabel
        labelPlacement="end"
        classes={{label: classes.label}}
        control={
          <SwitchSecondary
            name={props.name}
            checked={props.checked}
            onChange={(e) =>
              props.onChange(e.target.checked)}
          />
        }
        label={props.label}
      />
    </FormControl>
  );
};
