import {Grid} from '@mui/material';
import React from 'react';

export const GridContainer = (props) =>
  <Grid container {...props}/>;

export const GridItem = ({height, ...props}) =>
  <Grid item style={{height}} {...props}/>;