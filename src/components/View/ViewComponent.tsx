import React, { ReactNode, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewSelector, hideView, ViewType } from '../../store/viewSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';
import ViewContactComponent from './Contacts/ViewContactComponent';
import { AppDispatch } from '../../store/store';
import { contactsSelector, deleteSelectedContact } from '../../store/contactsSlice';
import { Contact } from '../../models/Contact';

interface ViewComponentProps {
    // Define your props here
}

const ViewComponent: React.FC<ViewComponentProps> = (props) => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();
    const selector = useSelector(viewSelector)

    const selectedContact = useSelector(contactsSelector).selectedContact as Contact

    const getView = (viewType: ViewType | undefined): ReactNode => {
        switch(viewType){
            case ViewType.Contacts:
                return <ViewContactComponent/>
        }
    }

    const deleteRecord = (viewType: ViewType | undefined) =>{
        switch(viewType){
            case ViewType.Contacts:
                appDispatch(deleteSelectedContact(selectedContact));
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
                        <Grid container justifyContent="center">
                            <Button sx={{marginRight:1}}variant="outlined" onClick={() => deleteRecord(selector.type)}>Delete</Button>
                            <Button variant="contained" onClick={()=>{dispatch(hideView())}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default ViewComponent;