import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/ContactsTable/ContactsTableComponent";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../../store/editSlice'
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import CompanyTableComponent from "../../components/CompaniesTable/CompaniesTable";
import { useParams } from "react-router-dom";
import { ViewType, showView } from "../../store/viewSlice";
import { AppDispatch } from "../../store/store";
import { getCompanyByUUID } from "../../store/companiesSlice";


const CompaniesPage: React.FC = () => {

        const dispatch = useDispatch();
        const appDispatch = useDispatch<AppDispatch>();
        const params = useParams();

        if(params.uuid){
                dispatch(showView(ViewType.Companies))
                appDispatch(getCompanyByUUID(params.uuid))
        }

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