import React, { Component, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddNewType, addNewSelector, hideAddNew} from '../../store/addNewSlice';
import { Button, Divider, Fade, Grid, Modal, Typography } from '@mui/material';
import AddNewContactComponent from './Contacts/AddNewContactComponent';

import { AppDispatch, RootState } from '../../store/store';
import AddNewCompanyComponent from './Companies/AddNewCompanyComponent';
import { createContact, formContactSelector, resetFormContact } from '../../store/contactFormSlice';
import { createCompany, formCompanySelector } from '../../store/companyFormSlice';
import { contactsSelector } from '../../store/contactsSlice';

interface AddNewComponentProps {
    // Define your props here
}

const AddNewComponent: React.FC<AddNewComponentProps> = (props) => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const AddNewSelector = useSelector(addNewSelector)

    const FormContactSelector = useSelector(formContactSelector)
    const FormCompanySelector = useSelector(formCompanySelector)

    const getNewForm = (addNewType: AddNewType | undefined): ReactNode => {
        switch(addNewType){
            case AddNewType.Contacts:

                return <AddNewContactComponent/>
            case AddNewType.Companies:
                return <AddNewCompanyComponent/>
        }
    }

    const submit = (addNewType: AddNewType | undefined) => {
        switch(addNewType){
            case AddNewType.Contacts:
                appDispatch(createContact(FormContactSelector.formContact))
                break;
            case AddNewType.Companies:
                appDispatch(createCompany(FormCompanySelector.formCompany))
        
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
                if(FormCompanySelector.formCompany.companyName === ""){
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


