import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { contactsSelector, fetchContacts, setSelectedContact } from '../../../store/contactsSlice';
import { DataGrid, GridCallbackDetails, GridColDef, GridEventListener, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import Flag from '../../../utils/flags.util'
import { Box, Grid, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../../utils/countryPhoneAreaCode';
import { ViewType, showView } from '../../../store/viewSlice';
import { companiesSelector, fetchCompanies, setSelectedCompany } from '../../../store/companiesSlice';
import { useNavigate } from 'react-router-dom';
import { formatAddress } from '../../../utils/formatAddress';
import { fetchProducts, productsSelector } from '../../../store/productsSlice';

const columns: GridColDef[] = [
    {
      field: 'sku',
      headerName: 'SKU',
      description: 'SKU',
      sortable: true,
      minWidth: 300
    },
    {
        field: 'productCode',
        headerName: 'Product Code',
        description: 'Product Code',
        sortable: true,
        width: 120
    },
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        description: 'Manufacturer',
        sortable: false,
        minWidth: 120,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.manufacturer?.companyName || ''}` 
    },
    {
        field: 'variant',
        headerName: 'Variant',
        description: 'Variant',
        sortable: false,
        minWidth: 300
    }

  ];

const ProductTableComponent: React.FC = ({}) => {

    const navigate = useNavigate();
    const appDispatch = useDispatch<AppDispatch>()
    const selector = useSelector(productsSelector)

    useEffect(() => { 
            appDispatch(fetchProducts(1))
    }, []) 

    const handleRowClick = (
        params : GridRowParams,
        event : MuiEvent<React.MouseEvent<HTMLElement>>,
        details : GridCallbackDetails
        ) => {
            navigate(`/products/${params.row.uuid}`)
    }

    
    return (
        <DataGrid
            getRowId={(row) => row.uuid}
            rows={selector.products}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 12,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
        />
    );
};

export default ProductTableComponent;