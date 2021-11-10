import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {Typography} from '@mui/material';

const BaseDialog = ({isOpen, title, message, children}) => {
  
  return (
    <div>
      <Dialog
        open={isOpen}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {message}
        </DialogContent>
        {children}
      </Dialog>
    </div>
  );
};

export default BaseDialog;