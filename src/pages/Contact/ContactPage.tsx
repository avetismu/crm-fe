import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/ContactTable/ContactTableComponent";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../../store/editSlice'
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { ViewType, showView } from "../../store/viewSlice";
import { ContactByNameProperty, fetchContacts, getContactByUUID, getContactsByName } from "../../store/contactsSlice";



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

        const filterContactsByName = (query: string) : void => {
                if (query.length > 0)
                        appDispatch(getContactsByName({query : query, property : ContactByNameProperty.Contacts}))
                else
                        appDispatch(fetchContacts(1))
        }


        return (
                <Container sx={{marginTop : "64px"}}>
                        <Box className="page-header-box">
                                <Typography variant="h5" align="left" gutterBottom>
                                        Contacts
                                </Typography>
                                <Grid container>
                                        <Grid md={6}>
                                                <Grid container justifyContent="left">
                                                        <TextField
                                                                id='filter-contacts'
                                                                size="small"
                                                                placeholder='Search Contacts by Name'
                                                                sx={{width: '100%'}}
                                                                onChange={(value) => filterContactsByName(value.target.value)}
                                                        />
                                                </Grid>
                                        </Grid>
                                        <Grid md={6}>
                                                <Grid container justifyContent="end">
                                                        <Button variant="outlined" onClick={() => showAddNewForm()}>Add New Contact</Button>
                                                </Grid>
                                        </Grid>
                                </Grid>
                        </Box>
                        <ContactsTableComponent />
                </Container>
                
        )
}

export default ContactsPage