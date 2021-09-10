import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {createTheme, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AlertDialog from '../ui/AlertDialog.js';
import {useSelector} from 'react-redux';

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
  {defaultTheme},
);

const RowMenuCell = (props) => {
  const {api, id} = props;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === 'edit';
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentListing = useSelector(state=>state.listings.find(l=>l.id===id));
  
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
    api.updateRows([{...row, isNew: false}]);
  };
  
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const deleteRow = () => {
    setDialogOpen(false);
    api.updateRows([{id, _action: 'delete'}]);
    // TODO dispatch flagDeleteListing(id)  not implemented
  };
  
  const handleCancelEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');
    
    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{id, _action: 'delete'}]);
    }
  };
  
  const handleEditAttributesClick = (event) => {
    event.stopPropagation();
    // TODO open edit attributes in modal
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
          <SaveIcon fontSize="small"/>
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          className={classes.textPrimary}
          onClick={handleCancelEditClick}
        >
          <CancelIcon fontSize="small"/>
        </IconButton>
      </div>
    
    );
  }
  
  return (
    <>
      <AlertDialog
        isOpen={dialogOpen}
        title={`Delete listing ${currentListing.plate} ?`}
        message={''}
        onAgree={deleteRow}
        onCancel={()=>setDialogOpen(false)}
      />
      <div className={classes.root}>
        <IconButton
          color="inherit"
          className={classes.textPrimary}
          size="small"
          aria-label="edit"
          onClick={handleEditClick}
        >
          <EditIcon fontSize="small"/>
        </IconButton>
        <IconButton
          color="inherit"
          className={classes.textPrimary}
          size="small"
          aria-label="edit_attributes"
          onClick={handleEditAttributesClick}
        >
          <OpenInNewIcon fontSize="small"/>
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="delete"
          onClick={handleDeleteClick}
        >
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </div>
    </>
  );
};

export default RowMenuCell;