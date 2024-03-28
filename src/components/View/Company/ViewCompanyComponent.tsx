import React from 'react';
import { useSelector } from 'react-redux';
import { contactsSelector } from '../../../store/contactsSlice';
import { Alert, Divider, Grid, Link, Typography } from '@mui/material';
import getCountryPhoneAreaCode from '../../../utils/countryPhoneAreaCode';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import Flag from '../../../utils/flags.util';
import { API_STATE } from '../../../store/api';
import { companiesSelector } from '../../../store/companiesSlice';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import HttpIcon from '@mui/icons-material/Http';
import PhoneIcon from '@mui/icons-material/Phone';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatAddress } from '../../../utils/formatAddress';
import { formatWebsiteURL } from '../../../utils/formatWebsite';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface ViewCompanyComponentProps {
}

const ViewCompanyComponent: React.FC<ViewCompanyComponentProps> = () => {
    const selector = useSelector(companiesSelector)

    return (
        <Grid>
            <Grid container className="form-row">
                {selector.deleteCompanyState === API_STATE.SUCCESS &&
                    <Alert className="modal-alert" severity="success">Record Deleted!</Alert>}
                {selector.deleteCompanyState === API_STATE.ERROR &&
                    <Alert className="modal-alert" severity="error">Deletion Error!</Alert>}
            </Grid>
            <Grid container sx={{padding:1}}>
                <Grid md={6}>
                    <Grid md={12} container justifyContent='center' sx={{marginBottom:'10px'}}>
                        <Typography variant='h5'>
                            {selector.selectedCompany?.companyName}
                        </Typography>
                    </Grid>
                    <Grid md={12} container justifyContent='center'>
                        <Typography variant='body2' sx={{paddingLeft: 5, paddingRight:5}}>
                            {selector.selectedCompany?.description}
                        </Typography>
                    </Grid>
                    <Grid md={12} container justifyContent='center'>
                        <Typography variant='body2'>
                            {selector.selectedCompany?.email}
                        </Typography>
                    </Grid>
                    {selector.selectedCompany?.contacts && 
                    (selector.selectedCompany?.contacts?.length > 0) && 
                    <Grid md={12} container justifyContent='left' sx={{marginTop:2}}>
                        <Typography variant='h6'>
                            People
                        </Typography>
                    </Grid>
                    }
                    <Grid md={12} container justifyContent='left'>
                        {selector.selectedCompany?.contacts?.map((contact) => 

                                <Grid md={12} container justifyContent='left' className='contact-row'>
                                    <Grid md={1}>
                                        <PersonIcon/>
                                    </Grid>
                                    <Grid md={6}>
                                        <Typography variant='body1'>
                                            {contact.firstName} {contact.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid md={4}>
                                        <Typography variant='body2'>
                                            {contact.description}
                                        </Typography>
                                    </Grid>
                                    <Grid md={1}>
                                        <Link href={`/contacts/${contact.uuid}`}>
                                            <ArrowOutwardIcon/>
                                        </Link>
                                    </Grid>
                                </Grid>
                        )}
                    </Grid>
                    {selector.selectedCompany?.subEntities && selector.selectedCompany?.subEntities?.length > 0 &&
                    <Grid md={12} container justifyContent='left' sx={{marginTop:2}}>
                        <Typography variant='h6'>
                            Sub-Entities
                        </Typography>
                    </Grid>
                    }
                    {selector.selectedCompany?.subEntities && selector.selectedCompany?.subEntities?.length > 0 &&
                    <Grid md={12} container justifyContent='left'>
                        {selector.selectedCompany?.subEntities?.map((entity) => 
                            <Grid md={12} container justifyContent='left' className='contact-row'>
                                <Grid md={2}>
                                    <BusinessIcon/>
                                </Grid>
                                <Grid md={10}>
                                    <Typography variant='body1'>
                                        {entity.companyName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid> }
                </Grid>
                <Grid md={6}>
                    {selector.selectedCompany?.parentEntity && 
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <BusinessIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Parent Entity
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body1'>
                                {selector.selectedCompany?.parentEntity?.companyName}
                            </Typography>
                            <Typography variant='body2'>
                                {formatAddress(
                                    selector.selectedCompany?.parentEntity?.streetAddress,
                                    selector.selectedCompany?.parentEntity?.city,
                                    selector.selectedCompany?.parentEntity?.district,
                                    selector.selectedCompany?.parentEntity?.province,
                                    selector.selectedCompany?.parentEntity?.country,
                                    selector.selectedCompany?.parentEntity?.postalCode
                                )}
                            </Typography>
                            <Flag countryCode={selector.selectedCompany?.parentEntity?.country}/>
                        </Grid>
                    </Grid>}
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <HomeIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Address
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body1'>
                                {formatAddress(
                                    selector.selectedCompany?.streetAddress,
                                    selector.selectedCompany?.city,
                                    selector.selectedCompany?.district,
                                    selector.selectedCompany?.province,
                                    selector.selectedCompany?.country,
                                    selector.selectedCompany?.postalCode
                                )}
                            </Typography>
                            <Flag countryCode={selector.selectedCompany?.country}/>
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
                            <Flag countryCode={selector.selectedCompany?.countryPhoneAreaCode}/>
                            <Link href={selector.selectedCompany?.website ? formatWebsiteURL(selector.selectedCompany?.website) : '#'} variant='body2'>
                                 {selector.selectedCompany?.website}
                            </Link>
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
                            <Flag countryCode={selector.selectedCompany?.countryPhoneAreaCode}/>
                            <Typography variant='body2' sx={{marginLeft:'10px'}}>
                                 {getCountryPhoneAreaCode(selector.selectedCompany?.countryPhoneAreaCode)} {selector.selectedCompany?.phoneNumber}
                            </Typography>
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
                                {selector.selectedCompany?.wechatId}
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
                            <Flag countryCode={selector.selectedCompany?.whatsappCountryPhoneAreaCode}/>
                            <Typography variant='body2' sx={{marginLeft:'10px'}}>
                                 {getCountryPhoneAreaCode(selector.selectedCompany?.whatsappCountryPhoneAreaCode)} {selector.selectedCompany?.whatsappNumber}
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
                                 {selector.selectedCompany?.contactType}
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
                                 {selector.selectedCompany?.contactMethod}
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
                                {selector.selectedCompany?.lastContact && new Date(selector.selectedCompany?.lastContact).toLocaleDateString('en-CA')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewCompanyComponent;