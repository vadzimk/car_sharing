import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// severity: error, warning, info, success
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification=({message, handleClose, severity})=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log('notification', message);
  
  useEffect(()=>{
    console.log('notification useEffect', message);
    if(message){
      setOpen(true);
    }
  },[message]);
  
 
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={()=>{handleClose(); setOpen(false);}} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;