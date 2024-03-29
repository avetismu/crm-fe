import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_STATE, createContactAsync, createProductAsync, editContactAsync, editProductAsync } from './api';
import { Contact } from '../models/Contact';
import { RootState } from './store';
import { Product } from '../models/Product';

interface ContactFormState {
  formProduct: {
    uuid: string 
    sku: string | undefined | null;
    productCode: string | undefined | null;
    barcode: string | undefined | null;
    manufacturer: any | undefined | null;
    variant: string | undefined | null;
    package: string | undefined | null;
    description: string | undefined | null;
    createdAt: Date | undefined | null;
    updatedAt: Date | undefined | null;
    },
  postNewProductState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
  editProductState :  API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: ContactFormState = {
  formProduct: {
    uuid: '',
    sku: null,
    productCode: null,
    barcode: null,
    manufacturer: null,
    variant: null,
    package: null,
    description: null,
    createdAt: null,
    updatedAt: null,
  },
  postNewProductState: API_STATE.IDLE,
  editProductState: API_STATE.IDLE,
};


export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (formProduct : any, thunkAPI) => {

      const product = Product.fromFormProduct(formProduct);

      const response = await createProductAsync(product as Product)
      return response
    },
  )

  export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (formProduct : any, thunkAPI) => {

      const product = Product.fromFormProduct(formProduct);

      const response = await editProductAsync(product as Product)
      return response
    },
  )

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {
        resetFormProduct : ()=> initialState,
        setFormProduct: (state, action) => {
          console.log('action', action)
            return {
              ...state,
              formProduct: {
                ...state.formProduct,
                ...action.payload
              }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            createProduct.fulfilled, (state, action) => {
                state.postNewProductState = API_STATE.SUCCESS
              }
          )
  
          builder.addCase(
            createProduct.rejected, (state, action) => {
              state.postNewProductState = API_STATE.ERROR
            }
          )
  
          builder.addCase(
            createProduct.pending, (state) => {
              state.postNewProductState = API_STATE.LOADING
            }
          )

          builder.addCase(
            editProduct.fulfilled, (state, action) => {
                state.editProductState = API_STATE.SUCCESS
              }
          )
  
          builder.addCase(
            editProduct.rejected, (state, action) => {
              state.editProductState = API_STATE.ERROR
            }
          )
  
          builder.addCase(
            editProduct.pending, (state) => {
              state.editProductState = API_STATE.LOADING
            }
          )
    }
});

export const { setFormProduct, resetFormProduct } = productFormSlice.actions;
export default productFormSlice.reducer;

export const formProductSelector = (state : RootState) => state.productForm
export const postNewContactStateSelector = (state : RootState) => state.contactForm.postNewContactState