import React from "react"; // Import the useEffect hook
import ContactsTableComponent from "../../components/Table/ContactTable/ContactTableComponent";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AddNewType, showAddNew } from "../../store/addNewSlice";
import { useParams } from "react-router-dom";
import { ViewType, showView } from "../../store/viewSlice";
import { AppDispatch } from "../../store/store";
import ProductTableComponent from "../../components/Table/ProductTable/ProductTable";
import { fetchProducts, getProductByUUID, queryProduct } from "../../store/productsSlice";


const ProductPage: React.FC = () => {

        const dispatch = useDispatch();
        const appDispatch = useDispatch<AppDispatch>();
        const params = useParams();

        if(params.uuid){
                dispatch(showView(ViewType.Products))
                appDispatch(getProductByUUID(params.uuid))
        }

        const showAddNewForm = () =>{
                dispatch(showAddNew(AddNewType.Products))
        }

        const filterProducts = (query: string) : void => {
                if (query.length > 0)
                        appDispatch(queryProduct(query))
                else
                        appDispatch(fetchProducts(1))
        }


        return (
                <Container sx={{marginTop : "64px"}}>
                        <Box className="page-header-box">
                                <Typography variant="h5" align="left" gutterBottom>
                                        Products
                                </Typography>
                                <Grid container>
                                        <Grid md={6}>
                                                <Grid container justifyContent="left">
                                                        <TextField
                                                                id='filter-products'
                                                                size="small"
                                                                placeholder='Search Prodcuts by SKU, Code or Variant'
                                                                sx={{width: '100%'}}
                                                                onChange={(value) => filterProducts(value.target.value)}
                                                        />
                                                </Grid>
                                        </Grid>
                                        <Grid md={6}>
                                                <Grid container justifyContent="end">
                                                        <Button variant="outlined" onClick={() => showAddNewForm()}>Add New Product</Button>
                                                </Grid>
                                        </Grid>
                                </Grid>
                        </Box>
                        <ProductTableComponent />
                </Container>
                
        )
}

export default ProductPage