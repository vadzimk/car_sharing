import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

// severity: error, warning, info, success
function Alert (props) {
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

const Notification = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const notification = useSelector(state => state.notification);
  
  useEffect(() => {
    console.log('notification useEffect', notification.message);
    if (notification.message) {
      setOpen(true);
    }
  }, [notification]);
  
  const onCloseAlert = () => {
    if (typeof notification.handleClose === 'function') {
      notification.handleClose();
    }
    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <Snackbar open={open}
                autoHideDuration={typeof notification.handleClose ===
                'function' ? null:6000} onClose={() => setOpen(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={onCloseAlert} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;