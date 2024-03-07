import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { contactsSelector, fetchContacts } from '../../store/contactsSlice';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValueGetterParams } from '@mui/x-data-grid';
import Flag from '../../utils/flags.util'
import { Box, Grid, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../utils/countryPhoneAreaCode';

interface Column {
    id: 'name' | 'email' | 'phone' | 'location' | 'type' | 'contact_method' | 'last_contacted';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

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
        minWidth: 160
    }

  ];

const ContactTableComponent: React.FC = ({}) => {

    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>()
    const selector = useSelector(contactsSelector)

    useEffect(() => { 
            appDispatch(fetchContacts(1))
    }, []) 

    
    return (
        <DataGrid
            getRowId={(row) => row.uuid}
            rows={selector.contacts}
            columns={columns}
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