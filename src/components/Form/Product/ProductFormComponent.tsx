import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { formProductSelector, setFormProduct } from '../../../store/productFormSlice';
import { CompanyByNameProperty, companiesSelector, getCompaniesByName } from '../../../store/companiesSlice';
import { API_STATE } from '../../../store/api';
import { Alert, Autocomplete, AutocompleteChangeReason, Divider, Grid, TextField, Typography } from '@mui/material';
import { Company } from '../../../models/Company';

const ProductFormComponent: React.FC = () => {

    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const FormProductSelector = useSelector(formProductSelector);
    const CompaniesSelector = useSelector(companiesSelector);

    let options : any[] = CompaniesSelector.companiesByName.map((result: Company) => {
    
        return {
          id: result.uuid, 
          label: result.companyName
        }
    
      })

      const handleOnChange = (event: any, value: any, reason: AutocompleteChangeReason) => {
        
        if (reason === 'selectOption') {
            dispatch(setFormProduct({
                manufacturer : CompaniesSelector.companiesByName.find((result: any) => result.uuid === value.id)
            }));
        }
        else if (reason === 'clear') {
            dispatch(setFormProduct({
                manufacturer : undefined
            }));
        }
    }
    
    return (
        <Grid>
            <Grid container className="form-row">
            {(FormProductSelector.postNewProductState === API_STATE.SUCCESS || FormProductSelector.editProductState === API_STATE.SUCCESS) &&
                <Alert className="modal-alert" severity="success">Form Submitted!</Alert>}
            {(FormProductSelector.postNewProductState === API_STATE.ERROR || FormProductSelector.editProductState === API_STATE.ERROR) &&
                <Alert className="modal-alert" severity="error">Submission Error</Alert>}
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                        sx={{width: '90%'}}
                        label="SKU"
                        onChange={(value) => {
                            dispatch(setFormProduct({sku : value.target.value}))
                        }}
                        placeholder='SKU'
                        value={FormProductSelector.formProduct.sku}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Product Code"
                        onChange={(value) => {
                            dispatch(setFormProduct({productCode : value.target.value}))
                        }}
                        placeholder='100020'
                        value={FormProductSelector.formProduct.productCode}
                    />
                </Grid>
                <Grid md={3}>
                    <TextField
                        label="Barcode"
                        onChange={(value) => {
                            dispatch(setFormProduct({barcode : value.target.value}))
                        }}
                        placeholder='12345678'
                        value={FormProductSelector.formProduct.barcode}
                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <Autocomplete
                            className='company-search-form'
                            disablePortal
                            options={options}
                            loading={CompaniesSelector.getCompaniesByNameState === API_STATE.LOADING}
                            noOptionsText='No Companies'
                            sx={{ width: '90%' }}
                            renderInput={(params) => <TextField {...params} label="Search Manufacturer by Name" />}
                            onInputChange={(event, newValue) => appDispatch(getCompaniesByName({query : newValue, property : CompanyByNameProperty.CompaniesByName}))}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            onChange={handleOnChange}
                            defaultValue={{id: '', label : FormProductSelector.formProduct.manufacturer?.companyName || ''}}
                            />
                </Grid>
            </Grid>
            <Grid container className='form-row'>
                <Typography variant='h6'>
                    Variant
                </Typography>
                <Divider sx={{width : '100%'}}/>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                    label="Variant"
                    sx={{width: '90%'}}
                    onChange={(value)=>{
                        dispatch(setFormProduct({variant : value.target.value}))
                    }}
                    placeholder='Variant'
                    multiline
                    value={FormProductSelector.formProduct.variant}
                    />
                </Grid>
                <Grid md={6}>
                    <TextField
                        sx={{width: '90%'}}
                        label="Package"
                        onChange={(value) => {
                            dispatch(setFormProduct({package : value.target.value}))
                        }}
                        placeholder='8 per Case'
                        value={FormProductSelector.formProduct.package}
                    />
                </Grid>
            </Grid>
            <Grid container className='form-row'>
                <Typography variant='h6'>
                    Description
                </Typography>
                <Divider sx={{width : '100%'}}/>
            </Grid>
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                    label="Description"
                    sx={{width: '90%'}}
                    onChange={(value)=>{
                        dispatch(setFormProduct({description : value.target.value}))
                    }}
                    placeholder='Description of Product.'
                    multiline
                    value={FormProductSelector.formProduct.description}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductFormComponent;