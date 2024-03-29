import React, { ReactNode, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewSelector, hideView, ViewType } from '../../store/viewSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';
import ViewContactComponent from './Contact/ViewContactComponent';
import { AppDispatch } from '../../store/store';
import { contactsSelector, deleteSelectedContact } from '../../store/contactsSlice';
import { Contact } from '../../models/Contact';
import ViewCompanyComponent from './Company/ViewCompanyComponent';
import { companiesSelector, deleteSelectedCompany } from '../../store/companiesSlice';
import { Company } from '../../models/Company';
import { EditType, showEdit } from '../../store/editSlice';
import { setFormContact } from '../../store/contactFormSlice';
import { setFormCompany } from '../../store/companyFormSlice';
import ViewProductComponent from './Product/ViewProductComponent';
import DialogComponent from '../Dialog/DialogComponent';
import { dialogSelector, hideDialog, showDialog } from '../../store/dialogSlice';
import { useNavigate } from 'react-router-dom';
import { setFormProduct } from '../../store/productFormSlice';
import { Product } from '../../models/Product';
import { deleteSelectedProduct, productsSelector } from '../../store/productsSlice';

const ViewComponent: React.FC = () => {
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const selector = useSelector(viewSelector)
    const DialogSelector = useSelector(dialogSelector)

    const navigate = useNavigate();
    

    const selectedContact = useSelector(contactsSelector).selectedContact as Contact
    const selectedCompany = useSelector(companiesSelector).selectedCompany as Company
    const selectedProduct = useSelector(productsSelector).selectedProduct as Product

    const getView = (viewType: ViewType | undefined): ReactNode => {
        switch(viewType){
            case ViewType.Contacts:
                return <ViewContactComponent/>
            case ViewType.Companies:
                return <ViewCompanyComponent/>
            case ViewType.Products:
                return <ViewProductComponent/>
        }
    }

    const deleteRecord = (viewType: ViewType | undefined) =>{
        switch(viewType){
            case ViewType.Contacts:
                appDispatch(deleteSelectedContact(selectedContact));
                break;
            case ViewType.Companies:
                appDispatch(deleteSelectedCompany(selectedCompany));
                break;
            case ViewType.Products:
                appDispatch(deleteSelectedProduct(selectedProduct));
                break;
        }
    }

    const editRecord = (viewType: ViewType | undefined) =>{
        dispatch(hideView());
        switch(viewType){
            case ViewType.Contacts:
                dispatch(showEdit(EditType.Contacts));
                dispatch(setFormContact(Contact.toFormContact(selectedContact)))
                break;
            case ViewType.Companies:
                dispatch(showEdit(EditType.Companies));
                dispatch(setFormCompany(Company.toFormCompany(selectedCompany)))
                break;
            case ViewType.Products:
                dispatch(showEdit(EditType.Products));
                dispatch(setFormProduct(Product.toFormProduct(selectedProduct)))
                break;
        }
    }

    
    const navigateToPage = (viewType : ViewType | undefined) =>{
        switch(viewType){
            case ViewType.Contacts:
                navigate('/contacts')
                break;
            case ViewType.Companies:
                navigate('/companies')
                break;
            case ViewType.Products:
                navigate('/products')
                break;
        }
        dispatch(hideView());
    }


    return (
        <Modal open={selector.isVisible}> 
            <Fade in={selector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="modal-box">
                        <Grid>
                            <Typography variant='h4'>
                                {selector.title}
                            </Typography>
                        </Grid>
                        <Grid>
                            {getView(selector.type)}
                        </Grid>
                        <Grid container justifyContent="center" sx={{marginTop:2}}>
                            <Button sx={{marginRight:1}} variant="text" onClick={()=> editRecord(selector.type)}>Edit</Button>
                            <Button sx={{marginRight:1}} variant="outlined" color="error" onClick={() => {dispatch(showDialog())}}>Delete</Button>
                            <Button variant="contained" onClick={()=> navigateToPage(selector.type)}>Close</Button>
                        </Grid>
                        <DialogComponent
                            affirmativeFC = {() => {
                                deleteRecord(selector.type); 
                                dispatch(hideDialog());
                            }}
                            negativeFC = {() => {dispatch(hideDialog())}}
                            title = 'Delete Record'
                            text = 'Are you sure you want to delete this record?'
                        />
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default ViewComponent;