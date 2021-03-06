import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {createTheme, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AlertDialog from '../ui/Dialogs/AlertDialog.js';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteListing} from '../../reducers/listingsReducer.js';

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

const RowMenuCell = ({params}) => {
  const {api, id} = params;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === 'edit';
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const handleEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'edit');
  };
  
  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, 'view');
    console.log('event from RowMenuCell', event);
    const row = api.getRow(id);
    api.updateRows([{...row, isNew: false}]);
  };
  
  const handleDelete = (event) => {
    event.stopPropagation();
    setDialogOpen(false);
    console.log('id', id);
    dispatch(deleteListing(id));
  };
  
  const openDialog = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  
  const handleCancelEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');
    
    const row = api.getRow(id);
    
    if (row.isNew) {
      api.updateRows([{id, _action: 'delete'}]);
    }
  };
  
    // send to edit listing route
  const handleEditAttributesClick = (event) => {
    event.stopPropagation();
    const row = api.getRow(id);
    history.push({pathname:'/listings/edit', state: row});
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
        title={`Delete listing ${api.getRow(id).plate} ?`}
        message={'This cannot be undone!'}
        onAgree={handleDelete}
        onCancel={() => setDialogOpen(false)}
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
          className={classes.textPrimary}
          onClick={openDialog}
        >
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </div>
    </>
  );
};

export default RowMenuCell;