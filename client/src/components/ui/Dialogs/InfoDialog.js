import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import BaseDialog from './BaseDialog.js';

const InfoDialog = ({isOpen, title, message, onClose}) => {
  
  return (
    <BaseDialog isOpen={isOpen} title={title} message={message}>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          OK
        </Button>
      </DialogActions>
    </BaseDialog>
  );
};

export default InfoDialog;