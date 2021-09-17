/* eslint-disable no-unused-vars */

import React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import RowMenuCell from './RowMenuCell.js';
import {makeStyles} from '@material-ui/core';
import {createTheme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateListing} from '../../reducers/listingsReducer.js';

function getThemePaletteMode (palette) {
  return palette.type || palette.mode;
}

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => {
    const backgroundColor =
      getThemePaletteMode(theme.palette) === 'dark' ?
        '#376331':
        theme.palette.primary.light;
    return {
      root: {
        border: 0,
        color:
          theme.palette.type === 'light'
            ? 'rgba(0,0,0,.85)'
            :'rgba(255,255,255,0.85)',
        fontFamily: theme.typography.fontFamily,
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.type === 'light' ?
            theme.palette.primary.main:
            '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid ${
            theme.palette.type === 'light' ? '#f0f0f0':'#303030'
          }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.type === 'light' ? '#f0f0f0':'#303030'
          }`,
        },
        '& .MuiDataGrid-cell': {
          color:
            theme.palette.type === 'light'
              ? 'rgba(0,0,0,.85)'
              :'rgba(255,255,255,0.65)',
          
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
        '& .MuiDataGrid-cell--editable': {
          backgroundColor,
        },
      },
    };
  },
  {defaultTheme},
);

const ListingTable = ({rows}) => {
  const classes = useStyles();
  const locationOptions = useSelector(state => state.location.myLocations);
  const columns = [
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      editable: true,
      cellClassName: classes.column,
      minWidth: 100,
    }, {
      field: 'plate',
      headerName: 'Plate',
      minWidth: 100,
      sortable: false,
      
    }, {
      field: 'make',
      headerName: 'Make',
      flex: 1,
      minWidth: 100,
      
    }, {
      field: 'model',
      headerName: 'Model',
      minWidth: 100,
      
    }, {
      field: 'year',
      headerName: 'Year',
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'transmission',
      headerName: 'Transmission',
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'seat_number',
      headerName: 'Seats',
      type: 'number',
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'large_bags_number',
      headerName: 'Bags',
      type: 'number',
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'miles_per_rental',
      headerName: 'Miles/rental',
      minWidth: 100,
      type: 'number',
      valueFormatter: (params) => `${params.value || '∞'}`,
    }, {
      field: 'category',
      headerName: 'Category',
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'location_id',
      headerName: 'Location',
      minWidth: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: locationOptions.map(l => ({
        label: `${l.addr_line1} ${l.addr_line2} ${l.zipcode}`,
        value: l.id,
      })),
      // [{label: '1', value: 1}, {label: '2', value: 2}],
      valueFormatter: (params) => {
        console.log('location value', params.value);
        return `${params.row.addr_line1 ||
        ''} ${params.row.addr_line2 || ''} ${params.row.zip || ''}`.replace(
          /\s+(?=\s|$)/g, '');},
      // valueParser: (value)=>{
      //   console.log('valueparser', value);}
    }, {
      field: 'base_rate',
      headerName: 'Daly rate',
      type: 'number',
      editable: true,
      minWidth: 120,
    }, {
      field: 'fee',
      headerName: 'Insurance fee',
      type: 'number',
      editable: true,
      minWidth: 130,
    }, {
      field: 'num_days_rented',
      headerName: 'Days Rented total',
      type: 'number',
      minWidth: 140,
    }, {
      field: 'sale_total',
      headerName: 'Sale total',
      type: 'number',
      minWidth: 130,
    }, {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 110,
      renderCell: RowMenuCell,
      
    },
  ].map(c => ({...c, headerAlign: 'center', flex: 1}));
  
  const [editRowsModel, setEditRowsModel] = React.useState({});
  
  const dispatch = useDispatch();
  // TODO fetch all locations with their ids of the host in redux state on login
  const handleEditRowsModelChange = React.useCallback((newModel) => {
    // TODO add validation of updated fields
    const updatedModel = {...newModel};
    if (Object.keys(updatedModel).length === 0) { // value has been submitted
      const id = Number(Object.keys(editRowsModel)[0]);
      const rowFromState = rows.find(r => r.id === id);
      const getchangedAttr = (prev, cur) => {
        const newValue = editRowsModel[id][cur].value;
        if (rowFromState[cur] !== newValue) {
          return {
            ...prev,
            [cur]: newValue,
          };
        } else {
          return prev;
        }
      };
      const attributes = Object.keys(editRowsModel[id]).
        reduce(getchangedAttr, {});
      const rowToSubmit = {id: id, ...attributes};
      console.log('rowToSubmit', rowToSubmit);
      dispatch(updateListing(rowToSubmit));
      
    }
    setEditRowsModel(updatedModel);
  }, [editRowsModel]);
  
  //
  // // eslint-disable-next-line no-unused-vars
  // const handleRowEditStart = (params, event) => {
  //   // event.defaultMuiPrevented = true;  // disables double-click edit mode
  // };
  //
  // eslint-disable-next-line no-unused-vars
  
  // const handleRowEditStop = (params) => {
  //   console.dir('handleRowEditStop params', params);
  // };
  //
  // const handleRowEditCommit = (id) => {
  //   // event.defaultMuiPrevented = true; // disables double-click edit mode
  //   console.dir('handleRowEditCommit id', id);
  //   // dispatch(updateListing({}));
  // };
  
  return (
    <div style={{display: 'flex', height: '100%'}}>
      <div style={{flexGrow: 1}}>
        <DataGrid
          // onRowEditStart={handleRowEditStart}
          // onRowEditStop={handleRowEditStop}
          // onRowEditCommit={handleRowEditCommit}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          editMode="row"
          className={classes.root}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          autoHeight
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: function NoRows () {
              return <div>loading...</div>;
            },
          }}
        />
      </div>
    </div>
  );
};

export default ListingTable;