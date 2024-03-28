import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {EditType, editSelector, hideEdit} from '../../store/editSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';
import { editContact, formContactSelector, resetFormContact, setFormContact } from '../../store/contactFormSlice';
import { editCompany, formCompanySelector, resetFormCompany } from '../../store/companyFormSlice';
import { AppDispatch } from '../../store/store';
import { contactsSelector } from '../../store/contactsSlice';
import CompanyFormComponent from '../Form/Company/CompanyFormComponent';
import ContactFormComponent from '../Form/Contact/ContactFormComponent';


interface EditComponentProps {
    // Define your props here
}

const EditComponent: React.FC<EditComponentProps> = (props) => {

    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const EditSelector = useSelector(editSelector)

    const ContactsSelector = useSelector(contactsSelector);

    const FormContactSelector = useSelector(formContactSelector)
    const FormCompanySelector = useSelector(formCompanySelector)

    const getEditForm = (editType: EditType | undefined): ReactNode => {
        switch(editType){
            case EditType.Contacts:            
                return <ContactFormComponent/>

            case EditType.Companies:
                return <CompanyFormComponent/>
        }
    }

    const submit = (editType: EditType | undefined) => {
        switch(editType){
            case EditType.Contacts:
                appDispatch(editContact(FormContactSelector.formContact))
                break;
            case EditType.Companies:
                appDispatch(editCompany(FormCompanySelector.formCompany))
        
        }
    }

    const isFormValid = (editType: EditType | undefined): boolean => {

        switch(editType){
            case EditType.Contacts:
                if(FormContactSelector.formContact.firstName === "" || FormContactSelector.formContact.lastName === ""){
                    return false
                }
                return true
            case EditType.Companies:
                if(FormCompanySelector.formCompany.companyName === ""){
                    return false
                }
                return true
        }

        return false
    }

    const resetEdit = (editType: EditType | undefined) : void => {
        switch(editType){
            case EditType.Contacts:
                dispatch(resetFormContact())
                break;
            case EditType.Companies:
                dispatch(resetFormCompany())
                break;
        }
    }

    return (
        <Modal open={EditSelector.isVisible}> 
            <Fade in={EditSelector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="modal-box">
                        <Grid>
                            <Typography variant='h4'>
                                {EditSelector.title}
                            </Typography>
                        </Grid>
                        <Grid>
                            {getEditForm(EditSelector.type)}
                        </Grid>
                        <Grid container justifyContent="center">
                            <Button variant="contained" sx={{marginRight:"1em"}} onClick={() => submit(EditSelector.type) } disabled={!isFormValid(EditSelector.type)}>Submit</Button>
                            <Button variant="outlined" onClick={()=>{dispatch(hideEdit()); resetEdit(EditSelector.type)}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default EditComponent;

