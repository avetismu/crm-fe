import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../components/ContactsTable/ContactsTableComponent";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import './ContactsPage.css';
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../store/editSlice'
import { AddNewType, showAddNew } from "../store/addNewSlice";



const ContactsPage: React.FC = () => {

        const dispatch = useDispatch();

        const showEditForm = () => {
                dispatch(showEdit(EditType.Contacts))
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