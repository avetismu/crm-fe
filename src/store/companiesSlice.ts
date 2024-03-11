import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, createCompanyAsync, deleteSelectCompanyAsync, fetchCompaniesAsync, getCompaniesByNameAsync } from "./api";
import { Company } from "../models/Company";

interface companiesState {
    companies: Company[];
    getAllCompaniesState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
    newCompany: Company;
    postNewCompanyState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
    selectedCompany: Company | undefined;
    deleteCompanyState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
    companiesByName: Company[];
    getCompaniesByNameState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: companiesState = {
    companies: [],
    getAllCompaniesState: API_STATE.IDLE,
    newCompany: new Company(),
    postNewCompanyState: API_STATE.IDLE,
    selectedCompany: undefined,
    deleteCompanyState:API_STATE.IDLE,
    companiesByName: [],
    getCompaniesByNameState: API_STATE.IDLE
}

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async (page : Number, thunkAPI) => {
      const response = await fetchCompaniesAsync(page)
      return response
    },
  )

  export const getCompaniesByName = createAsyncThunk(
    'companies/getCompaniesByName',
    async (companyName : string, thunkAPI) => {
      const response = await getCompaniesByNameAsync(companyName)
      return response
    },
  )

export const createCompany = createAsyncThunk(
    'companies/createCompany',
    async (company : Company, thunkAPI) => {
      const response = await createCompanyAsync(company)
      return response
    },
  )

  export const deleteSelectedCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (company : Company, thunkAPI) => {
      const response = await deleteSelectCompanyAsync(company)
      return response
    },
  )

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setNewCompany: (state, action) => {
            state.newCompany = action.payload
        },
        setSelectedCompany : (state, action) => {
            state.selectedCompany = state.companies.find(company => company.uuid === action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchCompanies.fulfilled, (state, action) => {
                state.getAllCompaniesState = API_STATE.IDLE
                state.companies = action.payload
        })
  
        builder.addCase(
          fetchCompanies.pending, (state) => {
            state.getAllCompaniesState = API_STATE.LOADING
          }
        )

        builder.addCase(
          createCompany.fulfilled, (state, action) => {
              state.postNewCompanyState = API_STATE.SUCCESS
            }
        )

        builder.addCase(
          createCompany.rejected, (state, action) => {
            state.postNewCompanyState = API_STATE.ERROR
          }
        )

        builder.addCase(
          createCompany.pending, (state) => {
            state.postNewCompanyState = API_STATE.LOADING
          }
        )

        builder.addCase(
          deleteSelectedCompany.fulfilled, (state, action) => {
            state.deleteCompanyState = API_STATE.SUCCESS
          }
        )

        builder.addCase(
          deleteSelectedCompany.rejected, (state, action) => {
            state.deleteCompanyState = API_STATE.ERROR
          }
        )

        builder.addCase(
          deleteSelectedCompany.pending, (state) => {
            state.deleteCompanyState = API_STATE.LOADING
          }
        )

        builder.addCase(
          getCompaniesByName.fulfilled, (state, action) => {
              state.getCompaniesByNameState = API_STATE.IDLE
              state.companiesByName = action.payload
        })

        builder.addCase(
          getCompaniesByName.pending, (state) => {
            state.getCompaniesByNameState = API_STATE.LOADING
          }
        )
      }
});

export const companiesSelector = (state : RootState ) => state.companies
export const { setNewCompany, setSelectedCompany } = companiesSlice.actions

export default companiesSlice.reducer