import React, { Component, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddNewType, addNewSelector, hideAddNew} from '../../store/addNewSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { createContact, formContactSelector, resetFormContact } from '../../store/contactFormSlice';
import { createCompany, formCompanySelector, resetFormCompany } from '../../store/companyFormSlice';
import CompanyFormComponent from '../Form/Company/CompanyFormComponent';
import ContactFormComponent from '../Form/Contact/ContactFormComponent';
import { createProduct, formProductSelector, resetFormProduct } from '../../store/productFormSlice';
import ProductFormComponent from '../Form/Product/ProductFormComponent';

const AddNewComponent: React.FC = () => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const AddNewSelector = useSelector(addNewSelector)

    const FormContactSelector = useSelector(formContactSelector)
    const FormCompanySelector = useSelector(formCompanySelector)
    const FormProductSelector = useSelector(formProductSelector)

    const getNewForm = (addNewType: AddNewType | undefined): ReactNode => {
        switch(addNewType){
            case AddNewType.Contacts:
                return <ContactFormComponent/>
            case AddNewType.Companies:
                return <CompanyFormComponent/>
            case AddNewType.Products:
                return <ProductFormComponent/>
        }
    }

    const submit = (addNewType: AddNewType | undefined) => {
        switch(addNewType){
            case AddNewType.Contacts:
                appDispatch(createContact(FormContactSelector.formContact))
                break;
            case AddNewType.Companies:
                appDispatch(createCompany(FormCompanySelector.formCompany))
                break;
            case AddNewType.Products:
                appDispatch(createProduct(FormProductSelector.formProduct))
                break;
        
        }

    }

    const isFormValid = (addNewType: AddNewType | undefined): boolean => {

        switch(addNewType){
            case AddNewType.Contacts:
                if(FormContactSelector.formContact.firstName === "" || FormContactSelector.formContact.lastName === ""){
                    return false
                }
                return true
            case AddNewType.Companies:
                if(FormCompanySelector.formCompany.companyName === null || FormCompanySelector.formCompany.companyName === ""){
                    return false
                }
                return true
            case AddNewType.Products:
                if(FormProductSelector.formProduct.sku === null ||FormProductSelector.formProduct.sku === ""){
                    return false
                }
                return true
        }

        return false
    }

    const resetAddNew = (addNewType: AddNewType | undefined) : void => {
        switch(addNewType){
            case AddNewType.Contacts:
                dispatch(resetFormContact())
                break;
            case AddNewType.Companies:
                dispatch(resetFormCompany())
                break;
            case AddNewType.Companies:
                dispatch(resetFormProduct())
                break;
        }
    }

    return (
        <Modal open={AddNewSelector.isVisible}> 
            <Fade in={AddNewSelector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="modal-box">
                        <Grid>
                            <Typography variant='h4'>
                                {AddNewSelector.title}
                            </Typography>
                        </Grid>
                        <Grid>
                            {getNewForm(AddNewSelector.type)}
                        </Grid>
                        <Grid container justifyContent="center">
                            <Button variant="contained" sx={{marginRight:"1em"}} onClick={() => submit(AddNewSelector.type)} disabled={!isFormValid(AddNewSelector.type)}>Submit</Button>
                            <Button variant="outlined" onClick={()=>{dispatch(hideAddNew()); resetAddNew(AddNewSelector.type)}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default AddNewComponent;


