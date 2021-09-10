import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {createTheme, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Close';
const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

function RowMenuCell(props) {
  const { api, id } = props;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === 'edit';
  
  const handleEditClick = (event) => {
    event.stopPropagation();
    // TODO send to edit listing route
    api.setRowMode(id, 'edit');
  };
  
  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, 'view');
    
    const row = api.getRow(id);
    api.updateRows([{ ...row, isNew: false }]);
  };
  
  const handleDeleteClick = (event) => {
    // TODO add confirmation
    event.stopPropagation();
    api.updateRows([{ id, _action: 'delete' }]);
  };
  
  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');
    
    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{ id, _action: 'delete' }]);
    }
  };
  
  if (isInEditMode) {
    return (
      <div className={classes.root}>
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          className={classes.textPrimary}
          onClick={handleCancelClick}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
  
  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={handleEditClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default RowMenuCell;