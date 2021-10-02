import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import theme from '../../Theme.js';

const AlertDialog = ({isOpen, title, message, onAgree, onCancel}) => {
  
  return (
    <div>
      <Dialog
        open={isOpen}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            NO
          </Button>
          <Button onClick={onAgree} style={{color: theme.text.primary}}
                  autoFocus
                  data-cy="btnConfirm"
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;