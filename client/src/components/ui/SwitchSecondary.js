// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Switch, withStyles} from '@material-ui/core';

const SwitchSecondary = withStyles(theme => ({
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

export default SwitchSecondary;