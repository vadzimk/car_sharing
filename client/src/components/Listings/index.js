import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GridContainer, GridItem} from '../ui/GridRenamed.js';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {getHostListings} from '../../reducers/listingsReducer.js';
import {Button} from '@material-ui/core';

const Listings = () => {
  const history = useHistory();
  
  const handleClick = () => {
    history.push('/listings/create');
  };
  
  const dispatch = useDispatch();
  const hostListings = useSelector(state => state.listings);
  useEffect(() => {
    dispatch(getHostListings());
  }, []);
  
  const columns = [
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      editable: true,
      flex: 1,
      minWidth: 100,
    }, {
      field: 'plate',
      headerName: 'Plate',
      flex: 1,
      minWidth: 100,
      
    }, {
      field: 'make',
      headerName: 'Make',
      flex: 1,
      minWidth: 100,
      
    }, {
      field: 'model',
      headerName: 'Model',
      flex: 1,
      minWidth: 100,
      
    }, {
      field: 'year',
      headerName: 'Year',
      flex: 1,
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'transmission',
      headerName: 'Transmission',
      flex: 1,
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'seat_number',
      headerName: 'Seats',
      type: 'number',
      flex: 1,
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'large_bags_number',
      headerName: 'Bags',
      type: 'number',
      flex: 1,
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'miles_per_rental',
      headerName: 'Miles/rental',
      flex: 1,
      minWidth: 100,
      type: 'number',
      valueFormatter: (params) => `${params.value || '∞'}`,
    }, {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 100,
      hide: true,
      
    }, {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      minWidth: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: [{label: '1', value: 1}, {label: '2', value: 2}],
      valueGetter: (params) => `${params.getValue(params.id, 'street') ||
      ''} ${params.getValue(params.id, 'number') || ''} ${params.getValue(
        params.id, 'zip') || ''}`,
    }, {
      field: 'base_rate',
      headerName: 'Daly rate',
      type: 'number',
      editable: true,
      flex: 1,
      minWidth: 100,
    }, {
      field: 'fee',
      headerName: 'Insurance fee',
      type: 'number',
      editable: true,
      flex: 1,
      minWidth: 100,
    }, {
      field: 'num_rentals',
      headerName: 'Rentals total',
      type: 'number',
      flex: 1,
      minWidth: 100,
    }, {
      field: 'sale_total',
      headerName: 'Sale total',
      type: 'number',
      flex: 1,
      minWidth: 100,
    }, {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 110,
      renderCell: function MyButton () {
        return <Button>Edit</Button>;
      },
      
    },
  ];
  
  // https://material-ui.com/components/data-grid/editing
  return (
    <GridContainer direction="column">
      <GridItem>
        <GridContainer direction="row" justifyContent="space-between">
          <GridItem>
            <button onClick={handleClick}>Add listing</button>
          </GridItem>
          <GridItem>
            From, to
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem style={{height: 400, width: '100%'}}>
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1}}>
            <DataGrid
              rows={hostListings}
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
              }}
            />
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
};

export default Listings;