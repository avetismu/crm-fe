import { Alert, Autocomplete, AutocompleteChangeReason, Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Contact } from '../../../models/Contact';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import { ContactType } from '../../../models/ContactType.enum';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, setNewContact } from '../../../store/contactsSlice';
import { CountryCode } from '../../../models/CountryCode.enum';
import { API_STATE } from '../../../store/api';
import { companiesSelector, getCompaniesByName } from '../../../store/companiesSlice';
import { Company } from '../../../models/Company';
import { AppDispatch } from '../../../store/store';

const AddNewContactComponent: React.FC = () => {

    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const selector = useSelector(contactsSelector);
    const CompaniesSelector = useSelector(companiesSelector);
    const newContact = selector.newContact;

    let options : any[] = CompaniesSelector.companiesByName.map((result: Company) => {
    
        return {
          id: result.uuid, 
          label: result.companyName
        }
    
      })

    const handleOnChange = (event: any, value: any, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption') {
        newContact.company = CompaniesSelector.companiesByName.find((result: any) => result.uuid === value.id)

        dispatch(setNewContact(newContact))
    }
    }


    return (
        <Grid>
            <Grid container className="form-row">
            {selector.postNewContactState === API_STATE.SUCCESS &&
                <Alert className="modal-alert" severity="success">Form Submitted!</Alert>}
            {selector.postNewContactState === API_STATE.ERROR &&
                <Alert className="modal-alert" severity="error">Submission Error</Alert>}
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="First Name"
                        onChange={(value) => {
                            newContact.firstName = value.target.value;
                            dispatch(setNewContact(newContact));
                        }}
                        placeholder='John'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Last Name"
                    onChange={(value)=>{
                        newContact.lastName = value.target.value;
                        dispatch(setNewContact(newContact));
                    }}
                    placeholder='Smith'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Email"
                    onChange={(value)=>{
                        newContact.email = value.target.value;
                        dispatch(setNewContact(newContact));
                    }}
                    placeholder='john@smith.com'
                    />
                </Grid>
                <Grid md={3} container>
                    <TextField
                        label="WeChat ID"
                        onChange={(value)=>{
                            newContact.wechatId = value.target.value;
                            dispatch(setNewContact(newContact));
                        }}
                        placeholder='WeChat ID'
                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                    label="Description"
                    sx={{width: '90%'}}
                    onChange={(value)=>{
                        newContact.description = value.target.value;
                        dispatch(setNewContact(newContact));
                    }}
                    placeholder='Description of contact.'
                    multiline
                    />
                </Grid>
                <Grid md={6}>
                <Autocomplete
                    className='property-search-form'
                    disablePortal
                    options={options}
                    loading={CompaniesSelector.getCompaniesByNameState === API_STATE.LOADING}
                    noOptionsText='No Companies'
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search Company by Name" />}
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
                                newContact.contactType = value.target.value as ContactType;
                                dispatch(setNewContact(newContact));
                            }}
                            value={newContact.contactType}
                        >
                            <MenuItem value='DISTRIBUTOR'>Distributor</MenuItem>
                            <MenuItem value='CUSTOMER'>Customer</MenuItem>
                            <MenuItem value='SUPPLIER'>Supplier</MenuItem>
                            <MenuItem value='PARTNER'>Partner</MenuItem>
                            <MenuItem value='INVESTOR'>Investor</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={3}>
                    <DatePicker
                    label="Last Contacted" 
                    sx={{maxWidth:'85%'}}
                    value={newContact.lastContact} 
                    onChange={(value) => {
                        newContact.lastContact = value;
                        dispatch(setNewContact(newContact));
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
                            newContact.countryPhoneAreaCode = countries.find((country) => country.phone === value)?.code as CountryCode;
                            dispatch(setNewContact(newContact));
                        }}
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
                                newContact.phoneNumber = value.target.value;
                                dispatch(setNewContact(newContact));
                            }}
                            placeholder='600-123-4567'
                        />
                </Grid>
                <Grid md={5} container>
                        <Autocomplete
                        options={countries}
                        autoHighlight
                        sx={{ width: 150 }}
                        getOptionLabel={(option) => option.phone}
                        onInputChange={(event, value) => {
                            newContact.whatsappCountryPhoneAreaCode = countries.find((country) => country.phone === value)?.code as CountryCode;
                            dispatch(setNewContact(newContact));
                        }}
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
                                newContact.whatsappNumber = value.target.value;
                                dispatch(setNewContact(newContact));
                            }}
                            placeholder='600-123-4567'
                        />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="Street Address"
                        onChange={(value)=>{
                            newContact.streetAddress = value.target.value;
                            dispatch(setNewContact(newContact));
                        }}
                        placeholder='123 Main St.'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="City"
                        onChange={(value)=>{
                            newContact.city = value.target.value;
                            dispatch(setNewContact(newContact));
                        }}
                        placeholder='New York'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Province"
                        onChange={(value)=>{
                            newContact.province = value.target.value;
                            dispatch(setNewContact(newContact));
                        }}
                        placeholder='NY'
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
                        newContact.country = countries.find((country) => country.label === value)?.code as CountryCode;
                        dispatch(setNewContact(newContact));
                    }}
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

export default AddNewContactComponent;