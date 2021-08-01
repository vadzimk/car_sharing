
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Switch, withStyles} from '@material-ui/core';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 48,
    height: 18,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(32px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 18 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
}))(Switch);


export default AntSwitch;