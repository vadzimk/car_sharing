/* eslint-disable no-unused-vars */

import React from 'react';
import Dropzone from '../Dropzone';
import {Grid, Typography} from '@material-ui/core';


const Sandbox = () => {
  return (
    <>
      <Typography variant='h5'>This is a sandbox</Typography>
    <Grid container>
      <Grid item style={{flexGrow:0}}>
        <Dropzone
          name="previews"
          handleError={() => {
          }}
        />
      </Grid>
    
    </Grid>
    </>
  );
};

export default Sandbox;