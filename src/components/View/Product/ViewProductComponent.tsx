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
import QrCodeIcon from '@mui/icons-material/QrCode';
import NumbersIcon from '@mui/icons-material/Numbers';
import { productsSelector } from '../../../store/productsSlice';

const ViewProductComponent: React.FC = () => {
    const selector = useSelector(productsSelector)

    return (
        <Grid>
            <Grid container className="form-row">
                {selector.deleteProductState === API_STATE.SUCCESS &&
                    <Alert className="modal-alert" severity="success">Record Deleted!</Alert>}
                {selector.deleteProductState === API_STATE.ERROR &&
                    <Alert className="modal-alert" severity="error">Deletion Error!</Alert>}
            </Grid>
            <Grid container sx={{padding:1}}>
                <Grid md={6} sx={{paddingLeft:5, paddingRight: 5}}>
                    <Grid md={12} container justifyContent='center' sx={{marginBottom:'10px'}}>
                        <Typography variant='h5'>
                            {selector.selectedProduct?.sku}
                        </Typography>
                    </Grid>
                    <Grid md={12} container justifyContent='center'>
                        <Typography variant='body2'>
                            {selector.selectedProduct?.description}
                        </Typography>
                    </Grid>
                    <Grid md={12} container sx={{marginTop: 5}}>
                        <Typography variant='h6'>
                            Variant
                        </Typography>
                        <Divider sx={{width : '100%'}}/>
                    </Grid>
                    <Grid md={12} container justifyContent='left'>
                        <Typography variant='body2' sx={{paddingTop: 2}}>
                            {selector.selectedProduct?.variant}
                        </Typography>
                    </Grid>
                    <Grid md={12} container sx={{marginTop: 5}}>
                        <Typography variant='h6'>
                            Package
                        </Typography>
                        <Divider sx={{width : '100%'}}/>
                    </Grid>
                    <Grid md={12} container justifyContent='left'>
                        <Typography variant='body2' sx={{paddingTop: 2}}>
                            {selector.selectedProduct?.package}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid md={6}>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <BusinessIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Manufacturer
                            </Typography>
                        </Grid>
                        {selector.selectedProduct?.manufacturer && 
                        <Grid md={6} >
                            <Link href={`/companies/${selector.selectedProduct?.manufacturer?.uuid}`} style={{ textDecoration: 'none' }}>
                                <Typography variant='body1'>
                                    {selector.selectedProduct?.manufacturer?.companyName}<ArrowOutwardIcon sx={{marginLeft: '10px', width:'15px', height:'15px'}}/>
                                </Typography>
                            </Link>
                            <Typography variant='body2'>
                                {formatAddress(
                                    selector.selectedProduct?.manufacturer?.streetAddress, 
                                    selector.selectedProduct?.manufacturer?.city,
                                    selector.selectedProduct?.manufacturer?.district,
                                    selector.selectedProduct?.manufacturer?.province, 
                                    selector.selectedProduct?.manufacturer?.country,
                                    selector.selectedProduct?.manufacturer?.postalCode
                                )}
                            </Typography>
                            <Flag countryCode={selector.selectedProduct?.manufacturer?.country}/>
                            
                        </Grid>}
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <NumbersIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Product Code
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body2'>
                                {selector.selectedProduct?.productCode}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid md={12} container className='information-row'>
                        <Grid md={6} container justifyContent='left'>
                            <QrCodeIcon sx={{width : '15px'}}/>
                            <Typography variant='body2' sx={{marginLeft:1, marginTop:0.3}}>
                                Barcode
                            </Typography>
                        </Grid>
                        <Grid md={6} >
                            <Typography variant='body2'>
                                {selector.selectedProduct?.barcode}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewProductComponent;