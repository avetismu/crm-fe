import React from 'react';
import { useSelector } from 'react-redux';
import { contactsSelector } from '../../../store/contactsSlice';
import { Alert, Divider, Grid, Link, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../../utils/countryPhoneAreaCode';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import Flag from '../../../utils/flags.util';
import { API_STATE } from '../../../store/api';

import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import HttpIcon from '@mui/icons-material/Http';
import PhoneIcon from '@mui/icons-material/Phone';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatWebsiteURL } from '../../../utils/formatWebsite';
import { formatAddress } from '../../../utils/formatAddress';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

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
                        <Grid md={6} container justifyContent='left'>
                            <BusinessIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Company
                            </Typography>
                        </Grid>
                        {selector.selectedContact?.company && 
                        <Grid md={6} >
                            <Link href={`/companies/${selector.selectedContact?.company?.uuid}`} style={{ textDecoration: 'none' }}>
                                <Typography variant='body1'>
                                    {selector.selectedContact?.company?.companyName}<ArrowOutwardIcon sx={{marginLeft: '10px', width:'15px', height:'15px'}}/>
                                </Typography>
                            </Link>
                            <Typography variant='body2'>
                                {formatAddress(
                                    selector.selectedContact?.company?.streetAddress, 
                                    selector.selectedContact?.company?.city,
                                    selector.selectedContact?.company?.district,
                                    selector.selectedContact?.company?.province, 
                                    selector.selectedContact?.company?.country,
                                    selector.selectedContact?.company?.postalCode
                                )}
                            </Typography>
                            <Flag countryCode={selector.selectedContact?.company?.country}/>
                            
                        </Grid>}
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <HomeIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Address
                            </Typography>
                        </Grid>
                        <Grid md={6}>
                            <Typography variant='body1'>
                            {formatAddress(
                                    selector.selectedContact?.streetAddress,
                                    selector.selectedContact?.city,
                                    selector.selectedContact?.district,
                                    selector.selectedContact?.province,
                                    selector.selectedContact?.country,
                                    selector.selectedContact?.postalCode
                                )}
                            </Typography>
                            <Flag countryCode={selector.selectedContact?.country}/>

                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <PhoneIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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
                        <Grid md={6} container justifyContent='left'>
                            <HttpIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Website
                            </Typography>
                        </Grid>
                        <Grid md={6} container>
                            <Link href={selector.selectedContact?.website ? formatWebsiteURL(selector.selectedContact?.website) : '#'} variant='body2'>
                                 {selector.selectedContact?.website}
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <StarBorderPurple500Icon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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
                        <Grid md={6} container justifyContent='left'>
                            <WhatsAppIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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
                        <Grid md={6} container justifyContent='left'>
                            <ConnectWithoutContactIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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
                        <Grid md={6} container justifyContent='left'>
                            <AppSettingsAltIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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
                        <Grid md={6} container justifyContent='left'>
                            <CalendarTodayIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
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