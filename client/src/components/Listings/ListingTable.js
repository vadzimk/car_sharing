import React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import RowMenuCell from './RowMenuCell.js';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
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
          theme.palette.primary.light:
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
    },
  }),
);

const ListingTable = ({rows}) => {
  const classes = useStyles();
  
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
      field: 'location',
      headerName: 'Location',
      minWidth: 120,
      editable: true,
      // type: 'singleSelect',
      // valueOptions: [{label: '1', value: 1}, {label: '2', value: 2}],
      valueGetter: (params) => `${params.row.street ||
      ''} ${params.row.number || ''} ${params.row.zip || ''}`,
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
  
  return (
    <div style={{display: 'flex', height: '100%'}}>
      <div style={{flexGrow: 1}}>
        <DataGrid
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
          editMode="row"
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default ListingTable;