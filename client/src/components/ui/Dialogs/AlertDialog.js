import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import theme from '../../../Theme.js';
import BaseDialog from './BaseDialog.js';

const AlertDialog = ({isOpen, title, message, onAgree, onCancel}) => {
  
  return (
    <BaseDialog isOpen={isOpen} title={title} message={message}>
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
    </BaseDialog>
  );
};

export default AlertDialog;