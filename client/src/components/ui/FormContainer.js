import React from 'react';
import {GridContainer, GridItem} from './GridRenamed.js';
import {Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  column: {
    ...theme.custom.mainColumn,
  },
}));

const FormContainer = ({title, children})=>{
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();
  
  return(
    <GridContainer direction="row" justifyContent="center">
      <GridItem className={classes.column}>
        <GridContainer direction="column" justifyContent="flex-start"
                       spacing={1}>
          <GridItem>
            <Typography variant="h5">{title}</Typography>
          </GridItem>
          <GridItem>
            {children}
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default FormContainer;