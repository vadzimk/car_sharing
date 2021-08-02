import {GridContainer, GridItem} from './GridRenamed.js';
import SwitchSecondary from './SwitchSecondary.js';
import {makeStyles, Typography} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  switch: {
    height: '46px',
  },
  switchLabel: {
    marginTop: '0.5em',
    color: theme.palette.grey['800'],
  },
}));

const SwitchLableled = ({labelLeft, labelRight, handleChange, value}) => {
  const classes = useStyles();
  
  return (
    <Typography component="div">
      <GridContainer component="label" alignItems="center" spacing={1}
                     className={classes.switchLabel}>
        <GridItem>{labelLeft}</GridItem>
        <GridItem>
          <SwitchSecondary defaultChecked={false}
                           name="ishost"
                           onChange={handleChange}
                           value={value}
          />
        </GridItem>
        <GridItem>{labelRight}</GridItem>
      </GridContainer>
    </Typography>
  );
};

export default SwitchLableled;
