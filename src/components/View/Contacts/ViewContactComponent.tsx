import React from 'react';
import { useSelector } from 'react-redux';
import { contactsSelector } from '../../../store/contactsSlice';
import { Alert, Divider, Grid, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../../utils/countryPhoneAreaCode';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import Flag from '../../../utils/flags.util';
import { API_STATE } from '../../../store/api';

interface ViewContactComponentProps {
}

const ViewContactComponent: React.FC<ViewContactComponentProps> = () => {
    const selector = useSelector(contactsSelector)

    return (
        <Grid>
            <Grid container className="form-row">
                {selector.deleteContactState === API_STATE.SUCCESS &&
                    <Alert className="modal-alert" severity="success">Record Deleted!</Alert>}
                {selector.deleteContactState === API_STATE.ERROR &&
                    <Alert className="modal-alert" severity="error">Deletion Error!</Alert>}
            </Grid>
            <Grid container sx={{padding:1}}>
                <Grid md={6}>
                    <Grid md={12} container justifyContent='center' sx={{marginBottom:'10px'}}>
                        <Typography variant='h5'>
                            {selector.selectedContact?.firstName} {selector.selectedContact?.lastName}
                        </Typography>
                    </Grid>
                    <Grid md={12} container justifyContent='center'>
                        <Typography variant='body1'>
                            {selector.selectedContact?.description}
                        </Typography>
                    </Grid>
                    <Grid md={12} container justifyContent='center'>
                        <Typography variant='body2'>
                            {selector.selectedContact?.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid md={6}>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Company
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body1'>
                                {selector.selectedContact?.company?.companyName}
                            </Typography>
                            <Typography variant='body2'>
                                {selector.selectedContact?.company?.streetAddress}, {selector.selectedContact?.company?.city}, {selector.selectedContact?.company?.province}, {countries.find((country) => country.code === selector.selectedContact?.company?.country)?.label}
                            </Typography>
                            <Flag countryCode={selector.selectedContact?.company?.country}/>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Address
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body1'>
                                {selector.selectedContact?.streetAddress}, {selector.selectedContact?.city}, {selector.selectedContact?.province}, {countries.find((country) => country.code === selector.selectedContact?.country)?.label}
                            </Typography>
                            <Flag countryCode={selector.selectedContact?.country}/>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Phone
                            </Typography>
                        </Grid>
                        <Grid md={6} container>
                            <Flag countryCode={selector.selectedContact?.countryPhoneAreaCode}/>
                            <Typography variant='body2' sx={{marginLeft:'10px'}}>
                                 {getCountryPhoneAreaCode(selector.selectedContact?.countryPhoneAreaCode)} {selector.selectedContact?.phoneNumber}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                WeChat
                            </Typography>
                        </Grid>
                        <Grid md={6}>
                            <Typography variant='body1'>
                                {selector.selectedContact?.wechatId}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                WhatsApp
                            </Typography>
                        </Grid>
                        <Grid md={6} container>
                            <Flag countryCode={selector.selectedContact?.whatsappCountryPhoneAreaCode}/>
                            <Typography variant='body2' sx={{marginLeft:'10px'}}>
                                 {getCountryPhoneAreaCode(selector.selectedContact?.whatsappCountryPhoneAreaCode)} {selector.selectedContact?.whatsappNumber}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Contact Type
                            </Typography>
                        </Grid>
                        <Grid md={6}>
                            <Typography variant='body1'>
                                 {selector.selectedContact?.contactType}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Preferred Contact Method
                            </Typography>
                        </Grid>
                        <Grid md={6}>
                            <Typography variant='body1'>
                                 {selector.selectedContact?.contactMethod}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6}>
                            <Typography variant='body2'>
                                Last Contacted
                            </Typography>
                        </Grid>
                        <Grid md={6}>
                            <Typography variant='body1'>
                                {selector.selectedContact?.lastContact && new Date(selector.selectedContact?.lastContact).toLocaleDateString('en-CA')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewContactComponent;