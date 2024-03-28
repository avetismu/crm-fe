import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { contactsSelector, fetchContacts, setSelectedContact } from '../../store/contactsSlice';
import { DataGrid, GridCallbackDetails, GridColDef, GridEventListener, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import Flag from '../../utils/flags.util'
import { Box, Grid, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../utils/countryPhoneAreaCode';
import { ViewType, showView } from '../../store/viewSlice';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      description: 'First name and last name',
      sortable: true,
      minWidth: 160,
      valueGetter: (params: GridValueGetterParams) =>
        ` ${params.row.lastName || ''}, ${params.row.firstName || ''}`
    },
    {
        field: 'company',
        headerName: 'Company',
        description: 'company',
        sortable: true,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
        ` ${params.row.company?.companyName || ''}`
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
        ` ${params.row.streetAddress || ''}, ${params.row.city}, ${params.row.province}, ${params.row.country}`
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
        ` ${new Date(params.row.lastContact).toLocaleDateString('en-CA') || ''}`
    }

  ];

const ContactTableComponent: React.FC = ({}) => {

    const navigate = useNavigate();
    const appDispatch = useDispatch<AppDispatch>()
    const selector = useSelector(contactsSelector)

    useEffect(() => { 
            appDispatch(fetchContacts(1))
    }, []) 

    const handleRowClick = (
        params : GridRowParams,
        event : MuiEvent<React.MouseEvent<HTMLElement>>,
        details : GridCallbackDetails
        ) => {
            navigate(`/contacts/${params.row.uuid}`)
    }

    
    return (
        <DataGrid
            getRowId={(row) => row.uuid}
            rows={selector.contacts}
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

export default ContactTableComponent;