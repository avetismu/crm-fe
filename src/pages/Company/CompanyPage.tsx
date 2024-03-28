import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/ContactTable/ContactTableComponent";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { EditType, showEdit } from '../../store/editSlice'
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import CompanyTableComponent from "../../components/CompanyTable/CompanyTable";
import { useParams } from "react-router-dom";
import { ViewType, showView } from "../../store/viewSlice";
import { AppDispatch } from "../../store/store";
import { CompanyByNameProperty, fetchCompanies, getCompaniesByName, getCompanyByUUID } from "../../store/companiesSlice";
import { Company } from "../../models/Company";


const CompanyPage: React.FC = () => {

        const dispatch = useDispatch();
        const appDispatch = useDispatch<AppDispatch>();
        const params = useParams();

        if(params.uuid){
                dispatch(showView(ViewType.Companies))
                appDispatch(getCompanyByUUID(params.uuid))
        }

        const showAddNewForm = () =>{
                dispatch(showAddNew(AddNewType.Companies))
        }

        const filterCompaniesByName = (query: string) : void => {
                if (query.length > 0)
                        appDispatch(getCompaniesByName({query : query, property : CompanyByNameProperty.Companies}))
                else
                        appDispatch(fetchCompanies(1))
        }


        return (
                <Container sx={{marginTop : "64px"}}>
                        <Box className="page-header-box">
                                <Typography variant="h5" align="left" gutterBottom>
                                        Companies
                                </Typography>
                                <Grid container>
                                        <Grid md={6}>
                                                <Grid container justifyContent="left">
                                                        <TextField
                                                                id='filter-companies'
                                                                size="small"
                                                                placeholder='Search Companies by Name'
                                                                sx={{width: '100%'}}
                                                                onChange={(value) => filterCompaniesByName(value.target.value)}
                                                        />
                                                </Grid>
                                        </Grid>
                                        <Grid md={6}>
                                                <Grid container justifyContent="end">
                                                        <Button variant="outlined" onClick={() => showAddNewForm()}>Add New Company</Button>
                                                </Grid>
                                        </Grid>
                                </Grid>
                        </Box>
                        <CompanyTableComponent />
                </Container>
                
        )
}

export default CompanyPage