import { Alert, Autocomplete, Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Contact } from '../../../models/Contact';
import { countries } from '../../../utils/CountryAutocompleteOptions';
import { ContactType } from '../../../models/ContactType.enum';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { CountryCode } from '../../../models/CountryCode.enum';
import { API_STATE } from '../../../store/api';
import { companiesSelector, setNewCompany } from '../../../store/companiesSlice';

const AddNewCompanyComponent: React.FC = () => {

    const dispatch = useDispatch();
    const selector = useSelector(companiesSelector);
    const newCompany = selector.newCompany;


    return (
        <Grid>
            <Grid container className="form-row">
            {selector.postNewCompanyState === API_STATE.SUCCESS &&
                <Alert className="modal-alert" severity="success">Form Submitted!</Alert>}
            {selector.postNewCompanyState === API_STATE.ERROR &&
                <Alert className="modal-alert" severity="error">Submission Error</Alert>}
            </Grid>
            <Grid container className="form-row">
                <Grid md={3}>
                    <TextField
                        label="Company Name"
                        onChange={(value) => {
                            newCompany.companyName = value.target.value;
                            dispatch(setNewCompany(newCompany));
                        }}
                        placeholder='ASMC Inc.'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                    label="Email"
                    onChange={(value)=>{
                        newCompany.email = value.target.value;
                        dispatch(setNewCompany(newCompany));
                    }}
                    placeholder='john@smith.com'
                    />
                </Grid>
                <Grid md={3} container>
                    <TextField
                        label="WeChat ID"
                        onChange={(value)=>{
                            newCompany.wechatId = value.target.value;
                            dispatch(setNewCompany(newCompany));
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
                        newCompany.description = value.target.value;
                        dispatch(setNewCompany(newCompany));
                    }}
                    placeholder='Description of contact.'
                    multiline
                    />
                </Grid>
                <Grid md={3}>
                    <FormControl fullWidth sx={{maxWidth:'85%'}}>
                        <InputLabel id="contact-type-label">Contact Type</InputLabel>
                        <Select
                            labelId="contact-type-label"
                            id="contact-type-select"
                            label="Contact Type"
                            onChange={(value)=>{
                                newCompany.contactType = value.target.value as ContactType;
                                dispatch(setNewCompany(newCompany));
                            }}
                            value={newCompany.contactType}
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
                    value={newCompany.lastContact} 
                    onChange={(value) => {
                        newCompany.lastContact = value;
                        dispatch(setNewCompany(newCompany));
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
                            newCompany.countryPhoneAreaCode = countries.find((country) => country.phone === value)?.code as CountryCode;
                            dispatch(setNewCompany(newCompany));
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
                                newCompany.phoneNumber = value.target.value;
                                dispatch(setNewCompany(newCompany));
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
                            newCompany.whatsappCountryPhoneAreaCode = countries.find((country) => country.phone === value)?.code as CountryCode;
                            dispatch(setNewCompany(newCompany));
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
                                newCompany.whatsappNumber = value.target.value;
                                dispatch(setNewCompany(newCompany));
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
                            newCompany.streetAddress = value.target.value;
                            dispatch(setNewCompany(newCompany));
                        }}
                        placeholder='123 Main St.'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="City"
                        onChange={(value)=>{
                            newCompany.city = value.target.value;
                            dispatch(setNewCompany(newCompany));
                        }}
                        placeholder='New York'
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Province"
                        onChange={(value)=>{
                            newCompany.province = value.target.value;
                            dispatch(setNewCompany(newCompany));
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
                        newCompany.country = countries.find((country) => country.label === value)?.code as CountryCode;
                        dispatch(setNewCompany(newCompany));
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

export default AddNewCompanyComponent;