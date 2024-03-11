import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/ContactsTable/ContactsTableComponent";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../../store/editSlice'
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import CompanyTableComponent from "../../components/CompaniesTable/CompaniesTable";



const CompaniesPage: React.FC = () => {

        const dispatch = useDispatch();

        const showEditForm = () => {
                dispatch(showEdit(EditType.Companies))
        }

        const showAddNewForm = () =>{
                dispatch(showAddNew(AddNewType.Companies))
        }


        return (
                <Container sx={{marginTop : "64px"}}>
                        <Box className="page-header-box">
                                <Typography variant="h5" align="left" gutterBottom>
                                        Companies
                                </Typography>
                                <Grid container justifyContent="end">
                                        <Button variant="outlined" onClick={() => showAddNewForm()}>Add New Company</Button>
                                </Grid>
                        </Box>
                        <CompanyTableComponent />
                </Container>
                
        )
}

export default CompaniesPage