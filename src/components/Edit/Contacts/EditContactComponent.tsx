import { Alert, Autocomplete, AutocompleteChangeReason, Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, {  useEffect, useMemo, useState } from 'react';
import { Contact } from '../../../models/Contact';
import { countries, getCountryByCode } from '../../../utils/CountryAutocompleteOptions';
import { ContactType } from '../../../models/ContactType.enum';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { CountryCode } from '../../../models/CountryCode.enum';
import { API_STATE } from '../../../store/api';
import { CompanyByNameProperty, companiesSelector, getCompaniesByName } from '../../../store/companiesSlice';
import { Company } from '../../../models/Company';
import { AppDispatch } from '../../../store/store';
import { Form, useFetcher } from 'react-router-dom';
import { isEmail, isPhoneNumber, isWeChatID } from '../../../utils/validation.util';
import { formContactSelector, postNewContactStateSelector, setFormContact } from '../../../store/contactFormSlice';
import dayjs from 'dayjs';

const EditContactComponent: React.FC = () => {

    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const FormContactSelector = useSelector(formContactSelector);
    const CompaniesSelector = useSelector(companiesSelector);
    

    let options : any[] = CompaniesSelector.companiesByName.map((result: Company) => {
    
        return {
          id: result.uuid, 
          label: result.companyName
        }
    
      })

    const handleOnChange = (event: any, value: any, reason: AutocompleteChangeReason) => {
        
        if (reason === 'selectOption') {
            dispatch(setFormContact({
                company : CompaniesSelector.companiesByName.find((result: any) => result.uuid === value.id)
            }));
        }
        else if (reason === 'clear') {
            dispatch(setFormContact({
                company : undefined
            }));
        }
    }

    useEffect(()=>{ console.log('FormContactSelect', FormContactSelector)}, [FormContactSelector])

    return (
        <Grid>
            <Grid container className="form-row">
            {FormContactSelector.editContactState === API_STATE.SUCCESS &&
                <Alert className="modal-alert" severity="success">Form Submitted!</Alert>}
            {FormContactSelector.editContactState === API_STATE.ERROR &&
                <Alert className="modal-alert" severity="error">Submission Error</Alert>}
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="First Name"
                        onChange={(value) => {
                            dispatch(setFormContact({firstName : value.target.value}))
                        }}
                        placeholder='John'
                        value={FormContactSelector.formContact.firstName}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Last Name"
                    onChange={(value)=>{
                        dispatch(setFormContact({lastName : value.target.value}))
                    }}
                    placeholder='Smith'
                    value={FormContactSelector.formContact.lastName}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Email"
                    onChange={(value)=>{
                        dispatch(setFormContact({
                            email : {
                                value: value.target.value,
                                error: !isEmail(value.target.value)
                            }
                        }))  
                    }}
                    placeholder='john@smith.com'
                    value={FormContactSelector.formContact.email.value}
                    error={FormContactSelector.formContact.email.error}
                    />
                </Grid>
                <Grid md={3} container>
                    <TextField
                        label="WeChat ID"
                        onChange={(value)=>{
                            dispatch(setFormContact({
                                wechatId : {
                                    value: value.target.value,
                                    error: !isWeChatID(value.target.value)
                                }
                            }))
                        }}
                        placeholder='WeChat ID'
                        error={FormContactSelector.formContact.wechatId.error}
                        value={FormContactSelector.formContact.wechatId.value}
                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                    label="Description"
                    sx={{width: '90%'}}
                    onChange={(value)=>{
                        dispatch(setFormContact({description : value.target.value}))
                    }}
                    placeholder='Description of contact.'
                    multiline
                    value={FormContactSelector.formContact.description}
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
                        renderInput={(params) => <TextField {...params} label="Search Company by Name" />}
                        onInputChange={(event, newValue) => appDispatch(getCompaniesByName({query : newValue, property : CompanyByNameProperty.CompaniesByName}))}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={handleOnChange}
                        defaultValue={{id: '', label : FormContactSelector.formContact.company?.companyName || ''}}
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
                                dispatch(setFormContact({contactType : value.target.value}))
                            }}
                            value={FormContactSelector.formContact.contactType}
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
                                dispatch(setFormContact({ contactMethod : value.target.value}))
                            }}
                            value={FormContactSelector.formContact.contactMethod}
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
                    value={dayjs(FormContactSelector.formContact.lastContact)} 
                    onChange={(value) => {
                        dispatch(setFormContact({lastContact : value?.toString()}));
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
                            if (newCountryPhoneAreaCode != FormContactSelector.formContact.countryPhoneAreaCode)
                                dispatch(setFormContact({countryPhoneAreaCode : newCountryPhoneAreaCode}))
                        }}
                        isOptionEqualToValue={(option, value) => option.phone === value.phone}
                        value={getCountryByCode(FormContactSelector.formContact.countryPhoneAreaCode)}
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
                                dispatch(setFormContact({phoneNumber : {
                                    value: value.target.value,
                                    error: !isPhoneNumber(value.target.value)
                                }}))
                            }}
                            placeholder='600-123-4567'
                            error={FormContactSelector.formContact.phoneNumber.error}
                            value={FormContactSelector.formContact.phoneNumber.value}
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
                            if (newWhatsappCountryPhoneAreaCode != FormContactSelector.formContact.whatsappCountryPhoneAreaCode)
                                dispatch(setFormContact({whatsappCountryPhoneAreaCode : newWhatsappCountryPhoneAreaCode}))
                        }}
                    
                        value={countries.find((country) => country.code === FormContactSelector.formContact.whatsappCountryPhoneAreaCode)}
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
                                dispatch(setFormContact({whatsappNumber : {
                                    value: value.target.value,
                                    error: !isPhoneNumber(value.target.value)
                                }}))
                            }}
                            placeholder='600-123-4567'
                            error={FormContactSelector.formContact.whatsappNumber.error}
                            value={FormContactSelector.formContact.whatsappNumber.value}
                        />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="Street Address"
                        onChange={(value)=>{
                            dispatch(setFormContact({streetAddress : value.target.value}))
                        }}
                        placeholder='123 Main St.'
                        value={FormContactSelector.formContact.streetAddress}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="City"
                        onChange={(value)=>{
                            dispatch(setFormContact({city : value.target.value}))
                        }}
                        placeholder='New York'
                        value={FormContactSelector.formContact.city}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Province/State"
                        onChange={(value)=>{
                            dispatch(setFormContact({province : value.target.value}))
                        }}
                        placeholder='NY'
                        value={FormContactSelector.formContact.province}
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
                        if (countryElement?.code != FormContactSelector.formContact.country)
                            dispatch(setFormContact({country : countryElement?.code}))
                    }}
                    value={countries.find((country) => country.code === FormContactSelector.formContact.country)}
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

export default EditContactComponent;