import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/ContactsTable/ContactsTableComponent";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../../store/editSlice'
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { ViewType, showView } from "../../store/viewSlice";
import { getContactByUUID } from "../../store/contactsSlice";



const ContactsPage: React.FC = () => {

        const dispatch = useDispatch();
        const appDispatch = useDispatch<AppDispatch>();
        const params = useParams();

        if(params.uuid){
                dispatch(showView(ViewType.Contacts))
                appDispatch(getContactByUUID(params.uuid))
        }

        const showAddNewForm = () =>{
                dispatch(showAddNew(AddNewType.Contacts))
        }


        return (
                <Container sx={{marginTop : "64px"}}>
                        <Box className="page-header-box">
                                <Typography variant="h5" align="left" gutterBottom>
                                        Contacts
                                </Typography>
                                <Grid container justifyContent="end">
                                        <Button variant="outlined" onClick={() => showAddNewForm()}>Add New Contact</Button>
                                </Grid>
                        </Box>
                        <ContactsTableComponent />
                </Container>
                
        )
}

export default ContactsPage