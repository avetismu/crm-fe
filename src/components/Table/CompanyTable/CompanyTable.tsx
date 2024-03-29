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

interface Column {
    id: 'name' | 'email' | 'phone' | 'location' | 'type' | 'contact_method' | 'last_contacted';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company Name',
      description: 'Company Name',
      sortable: true,
      minWidth: 160
    },
    {
        field: 'email',
        headerName: 'Email',
        description: 'email',
        sortable: true,
        width: 160
    },
    {
        field: 'phone',
        headerName: 'Phone',
        description: 'phone',
        sortable: false,
        minWidth: 160,
        renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
            <Grid container>
            <Flag countryCode={params.row.countryPhoneAreaCode}/>
            <Typography sx={{marginLeft:1}} variant='body2'>
                {`${getCountryPhoneAreaCode(params.row.countryPhoneAreaCode)|| ''} ${params.row.phoneNumber || ''}`}
            </Typography>
            </Grid>
        )
    },
    {
        field: 'address',
        headerName: 'Address',
        description: 'address',
        sortable: false,
        minWidth: 160,
        valueGetter: (params: GridValueGetterParams) =>
            formatAddress(
                params.row.streetAddress,
                params.row.city,
                params.row.district,
                params.row.province,
                params.row.country,
                params.row.postalCode
            )
    },
    {
        field: 'contactType',
        headerName: 'Type',
        description: 'type',
        sortable: false,
        minWidth: 120
    },
    {
        field: 'lastContact',
        headerName: 'Last Contacted',
        description: 'last contacted',
        sortable: true,
        minWidth: 160,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.lastContact ? `${new Date(params.row.lastContact).toLocaleDateString('en-CA')}` : ''
    }

  ];

const CompanyTableComponent: React.FC = ({}) => {

    const navigate = useNavigate();
    const appDispatch = useDispatch<AppDispatch>()
    const selector = useSelector(companiesSelector)

    useEffect(() => { 
            appDispatch(fetchCompanies(1))
    }, []) 

    const handleRowClick = (
        params : GridRowParams,
        event : MuiEvent<React.MouseEvent<HTMLElement>>,
        details : GridCallbackDetails
        ) => {
            navigate(`/companies/${params.row.uuid}`)
    }

    
    return (
        <DataGrid
            getRowId={(row) => row.uuid}
            rows={selector.companies}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 20,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
        />
    );
};

export default CompanyTableComponent;