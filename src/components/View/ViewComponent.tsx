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

interface ViewComponentProps {
    // Define your props here
}

const ViewComponent: React.FC<ViewComponentProps> = (props) => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const selector = useSelector(viewSelector)
    

    const selectedContact = useSelector(contactsSelector).selectedContact as Contact
    const selectedCompany = useSelector(companiesSelector).selectedCompany as Company

    const getView = (viewType: ViewType | undefined): ReactNode => {
        switch(viewType){
            case ViewType.Contacts:
                return <ViewContactComponent/>
            case ViewType.Companies:
                return <ViewCompanyComponent/>
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
        }
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
                            <Button sx={{marginRight:1}} variant="outlined" color="error" onClick={() => deleteRecord(selector.type)}>Delete</Button>
                            <Button variant="contained" onClick={()=>{dispatch(hideView())}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default ViewComponent;