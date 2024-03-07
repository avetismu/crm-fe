import React, { Component, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddNewType, addNewSelector, hideAddNew} from '../../store/addNewSlice';
import { Button, Divider, Fade, Grid, Modal, Typography } from '@mui/material';
import AddNewContactComponent from './Contacts/AddNewContactComponent';
import { createContact, contactsSelector } from '../../store/contactsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Contact } from '../../models/Contact';

interface AddNewComponentProps {
    // Define your props here
}

const AddNewComponent: React.FC<AddNewComponentProps> = (props) => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const AddNewselector = useSelector(addNewSelector)
    const ContactsSelector = useSelector(contactsSelector)

    const getNewForm = (addNewType: AddNewType | undefined): ReactNode => {
        switch(addNewType){
            case AddNewType.Contacts:
                return <AddNewContactComponent/>
        }
    }

    const submit = (addNewType: AddNewType | undefined) => {
        switch(addNewType){
            case AddNewType.Contacts:
                appDispatch(createContact(ContactsSelector.newContact))
        
        }

    }

    return (
        <Modal open={AddNewselector.isVisible}> 
            <Fade in={AddNewselector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="modal-box">
                        <Grid>
                            <Typography variant='h4'>
                                {AddNewselector.title}
                            </Typography>
                        </Grid>
                        <Grid>
                            {getNewForm(AddNewselector.type)}
                        </Grid>
                        <Grid container justifyContent="center">
                            <Button variant="contained" sx={{marginRight:"1em"}} onClick={() => submit(AddNewselector.type)}>Submit</Button>
                            <Button variant="outlined" onClick={()=>{dispatch(hideAddNew())}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default AddNewComponent;