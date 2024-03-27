import { Alert, Autocomplete, AutocompleteChangeReason, Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { API_STATE } from '../../../store/api';
import { companiesSelector, getCompaniesByName } from '../../../store/companiesSlice';
import { Company } from '../../../models/Company';
import { AppDispatch } from '../../../store/store';
import { formCompanySelector, setFormCompany } from '../../../store/companyFormSlice';
import { isEmail, isPhoneNumber, isWeChatID } from '../../../utils/validation.util';
import dayjs from 'dayjs';

const AddNewCompanyComponent: React.FC = () => {

    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const FormCompanySelector = useSelector(formCompanySelector);
    const CompaniesSelector = useSelector(companiesSelector);

    let options : any[] = CompaniesSelector.companiesByName.map((result: Company) => {
    
        return {
          id: result.uuid, 
          label: result.companyName
        }
    
      })

    const handleOnChange = (event: any, value: any, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption') {
        dispatch(setFormCompany({parentEntity : CompaniesSelector.companiesByName.find((result: any) => result.uuid === value.id)}))
    }
    }


    return (
        <Grid>
            <Grid container className="form-row">
            {FormCompanySelector.postNewCompanyState === API_STATE.SUCCESS &&
                <Alert className="modal-alert" severity="success">Form Submitted!</Alert>}
            {FormCompanySelector.postNewCompanyState === API_STATE.ERROR &&
                <Alert className="modal-alert" severity="error">Submission Error</Alert>}
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="Company Name"
                        onChange={(value) => {
                            dispatch(setFormCompany({companyName : value.target.value}));
                        }}
                        placeholder='ASMC Inc.'
                        value={FormCompanySelector.formCompany.companyName}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Email"
                    onChange={(value)=>{
                        dispatch(setFormCompany({email : {
                            value : value.target.value,
                            error : !isEmail(value.target.value)
                        }}));
                    }}
                    placeholder='john@smith.com'
                    error={FormCompanySelector.formCompany.email.error}
                    value={FormCompanySelector.formCompany.email.value}
                    />
                </Grid>
                <Grid md={3} container>
                    <TextField
                        label="WeChat ID"
                        onChange={(value)=>{
                            dispatch(setFormCompany({
                                wechatId : {
                                    value : value.target.value,
                                    error : !isWeChatID(value.target.value)
                                }
                            }));
                        }}
                        placeholder='WeChat ID'
                        error={FormCompanySelector.formCompany.wechatId.error}
                        value={FormCompanySelector.formCompany.wechatId.value}

                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                    label="Description"
                    sx={{width: '90%'}}
                    onChange={(value)=>{
                        dispatch(setFormCompany({description : value.target.value}));
                    }}
                    placeholder='Description of contact.'
                    multiline
                    />
                </Grid>
                <Grid md={6}>
                    <Autocomplete
                        className='company-search-form'
                        disablePortal
                        options={options}
                        loading={CompaniesSelector.getCompaniesByNameState === API_STATE.LOADING}
                        noOptionsText='No Companies'
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Search Parent Company by Name" />}
                        onInputChange={(event, newValue) => appDispatch(getCompaniesByName(newValue))}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={handleOnChange}
                        />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <FormControl fullWidth sx={{maxWidth:'85%'}}>
                        <InputLabel id="contact-type-label">Contact Type</InputLabel>
                        <Select
                            labelId="contact-type-label"
                            id="contact-type-select"
                            label="Contact Type"
                            onChange={(value)=>{
                                dispatch(setFormCompany({contactType : value.target.value}));
                            }}
                            value={FormCompanySelector.formCompany.contactType}
                        >
                            <MenuItem value='DISTRIBUTOR'>Distributor</MenuItem>
                            <MenuItem value='CUSTOMER'>Customer</MenuItem>
                            <MenuItem value='SUPPLIER'>Supplier</MenuItem>
                            <MenuItem value='PARTNER'>Partner</MenuItem>
                            <MenuItem value='INVESTOR'>Investor</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={4}>
                    <FormControl fullWidth sx={{maxWidth:'85%'}}>
                        <InputLabel id="contact-method-label">Preferred Contact Method</InputLabel>
                        <Select
                            labelId="contact-method-label"
                            id="contact-method-select"
                            label="Preferred Contact Method"
                            onChange={(value)=>{
                                dispatch(setFormCompany({contactMethod : value.target.value}));
                            }}
                            value={FormCompanySelector.formCompany.contactMethod}
                        >
                            <MenuItem value='EMAIL'>Email</MenuItem>
                            <MenuItem value='PHONE'>Phone</MenuItem>
                            <MenuItem value='WHATSAPP'>WhatsApp</MenuItem>
                            <MenuItem value='WECHAT'>WeChat</MenuItem>
                            <MenuItem value='FACEBOOK'>Facebook</MenuItem>
                            <MenuItem value='LINKEDIN'>LinkedIn</MenuItem>
                            <MenuItem value='INSTAGRAM'>Instagram</MenuItem>
                            <MenuItem value='TWITTER'>Twitter</MenuItem>
                            <MenuItem value='WEBSITE'>Website</MenuItem>
                            <MenuItem value='IN_PERSON'>In Person</MenuItem>
                            <MenuItem value='OTHER'>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={3}>
                    <DatePicker
                    label="Last Contacted" 
                    sx={{maxWidth:'85%'}}
                    value={dayjs(FormCompanySelector.formCompany.lastContact)} 
                    onChange={(value) => {
                        dispatch(setFormCompany({lastContact : value}));
                    }} 
                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={5} container>
                        <Autocomplete
                        options={countries}
                        autoHighlight
                        sx={{ width: 150 }}
                        getOptionLabel={(option) => option.phone}
                        onInputChange={(event, value) => {
                            let newCountryPhoneAreaCode = countries.find((country) => country.phone === value)?.code
                            if (newCountryPhoneAreaCode != FormCompanySelector.formCompany.countryPhoneAreaCode)
                                dispatch(setFormCompany({countryPhoneAreaCode : newCountryPhoneAreaCode}));
                        }}
                        value={countries.find((country) => country.code === FormCompanySelector.formCompany.countryPhoneAreaCode)}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                            loading="lazy"
                            width="20"
                            src={require(`./../../../assets/svg/${option.code.toLowerCase()}.svg`)}
                            alt=""
                            />
                            ({option.phone})
                        </Box>
                        )}

                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Calling Code"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                        />
                        <TextField
                            sx={{marginLeft:"10px"}}
                            label="Phone Number"
                            onChange={(value)=>{
                                dispatch(setFormCompany({
                                    phoneNumber : {
                                        value : value.target.value,
                                        error : !isPhoneNumber(value.target.value)
                                    }
                                }));
                            }}
                            placeholder='600-123-4567'
                            error={FormCompanySelector.formCompany.phoneNumber.error}
                            value={FormCompanySelector.formCompany.phoneNumber.value}
                        />
                </Grid>
                <Grid md={5} container>
                        <Autocomplete
                        options={countries}
                        autoHighlight
                        sx={{ width: 150 }}
                        getOptionLabel={(option) => option.phone}
                        onInputChange={(event, value) => {
                            let newWhatsappCountryPhoneAreaCode = countries.find((country) => country.phone === value)?.code
                            if (newWhatsappCountryPhoneAreaCode != FormCompanySelector.formCompany.whatsappCountryPhoneAreaCode)
                            dispatch(setFormCompany({whatsappCountryPhoneAreaCode : newWhatsappCountryPhoneAreaCode}));
                        }}
                        value={countries.find((country) => country.code === FormCompanySelector.formCompany.whatsappCountryPhoneAreaCode)}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                            loading="lazy"
                            width="20"
                            src={require(`./../../../assets/svg/${option.code.toLowerCase()}.svg`)}
                            alt=""
                            />
                            ({option.phone})
                        </Box>
                        )}

                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Calling Code"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                        />
                        <TextField
                            sx={{marginLeft:"10px"}}
                            label="WhatsApp Phone Number"
                            onChange={(value)=>{
                                dispatch(setFormCompany({
                                    whatsappNumber : {
                                        value : value.target.value,
                                        error : !isPhoneNumber(value.target.value)
                                    }
                                }));
                            }}
                            placeholder='600-123-4567'
                            error={FormCompanySelector.formCompany.whatsappNumber.error}
                            value={FormCompanySelector.formCompany.whatsappNumber.value}
                        />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="Street Address"
                        onChange={(value)=>{
                            dispatch(setFormCompany({streetAddress : value.target.value}));
                        }}
                        placeholder='123 Main St.'
                        value={FormCompanySelector.formCompany.streetAddress}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="City"
                        onChange={(value)=>{
                            dispatch(setFormCompany({city : value.target.value}));
                        }}
                        placeholder='New York'
                        value={FormCompanySelector.formCompany.city}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Province"
                        onChange={(value)=>{
                            dispatch(setFormCompany({province : value.target.value}));
                        }}
                        placeholder='NY'
                        value={FormCompanySelector.formCompany.province}
                    />
                </Grid>
                <Grid md={3}>
                    <Autocomplete
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={require(`./../../../assets/svg/${option.code.toLowerCase()}.svg`)}
                          alt=""
                        />
                        {option.label} ({option.code})
                      </Box>
                    )}
                    onInputChange={(event, value) => {
                        let countryElement = countries.find((country) => country.label === value)
                        if (countryElement?.code != FormCompanySelector.formCompany.country)
                            dispatch(setFormCompany({country : countryElement?.code}))
                    }}
                    value={countries.find((country) => country.code === FormCompanySelector.formCompany.country)}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                    )}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddNewCompanyComponent;