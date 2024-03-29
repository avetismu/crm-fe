import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, fetchProductsAsync, getProductByUUIDAsync, deleteSelectProductAsync, queryProductAsync } from "./api";
import { Product } from "../models/Product";

interface productsState {
  products: any[];
  getAllProductsState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
  queryProductState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
  getProductByUUIDState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
  selectedProduct: Product | undefined;
  deleteProductState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: productsState = {
  products: [],
  getAllProductsState: API_STATE.IDLE,
  queryProductState: API_STATE.IDLE,
  getProductByUUIDState: API_STATE.IDLE,
  selectedProduct: undefined,
  deleteProductState: API_STATE.IDLE,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number, thunkAPI) => {
    const response = await fetchProductsAsync(page);
    return response;
  },
);

export const queryProduct = createAsyncThunk(
  'products/queryProduct',
  async (query: string, thunkAPI) => {
    const response = await queryProductAsync(query);
    return response;
  },
);

export const getProductByUUID = createAsyncThunk(
  'products/findProductByUUID',
  async (uuid: string, thunkAPI) => {
    const response = await getProductByUUIDAsync(uuid);
    return response;
  },
);

export const deleteSelectedProduct = createAsyncThunk(
  'products/deleteProduct',
  async (product: Product, thunkAPI) => {
    const response = await deleteSelectProductAsync(product);
    return response;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = state.products.find(product => product.uuid === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled, (state, action) => {
        state.getAllProductsState = API_STATE.IDLE;
        state.products = action.payload;
      },
    );

    builder.addCase(
      fetchProducts.pending, (state) => {
        state.getAllProductsState = API_STATE.LOADING;
      },
    );

    builder.addCase(
      queryProduct.fulfilled, (state, action) => {
        state.queryProductState = API_STATE.IDLE;
        state.products = action.payload;
      },
    );

    builder.addCase(
      queryProduct.pending, (state) => {
        state.queryProductState = API_STATE.LOADING;
      },
    );

    builder.addCase(
      getProductByUUID.fulfilled, (state, action) => {
        state.getProductByUUIDState = API_STATE.IDLE;
        state.selectedProduct = action.payload;
      },
    );

    builder.addCase(
      getProductByUUID.pending, (state) => {
        state.getProductByUUIDState = API_STATE.LOADING;
      },
    );

    builder.addCase(
      deleteSelectedProduct.fulfilled, (state, action) => {
        state.deleteProductState = API_STATE.SUCCESS;
      },
    );

    builder.addCase(
      deleteSelectedProduct.rejected, (state, action) => {
        state.deleteProductState = API_STATE.ERROR;
      },
    );

    builder.addCase(
      deleteSelectedProduct.pending, (state) => {
        state.deleteProductState = API_STATE.LOADING;
      },
    );
  },
});

export const productsSelector = (state: RootState) => state.products;
export const { setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
