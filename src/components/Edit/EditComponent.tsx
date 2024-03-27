import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {EditType, editSelector, hideEdit} from '../../store/editSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';
import { editContact, formContactSelector, setFormContact } from '../../store/contactFormSlice';
import { editCompany, formCompanySelector } from '../../store/companyFormSlice';
import EditContactComponent from './Contacts/EditContactComponent';
import { AppDispatch } from '../../store/store';
import { contactsSelector } from '../../store/contactsSlice';
import dayjs from 'dayjs';
import { Edit } from '@mui/icons-material';
import EditCompanyComponent from './Companies/EditCompanyComponent';


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
                return <EditContactComponent/>

            case EditType.Companies:
                return <EditCompanyComponent/>
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
                            <Button variant="contained" sx={{marginRight:"1em"}} onClick={() => submit(EditSelector.type)} disabled={!isFormValid(EditSelector.type)}>Submit</Button>
                            <Button variant="outlined" onClick={()=>{dispatch(hideEdit())}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default EditComponent;

