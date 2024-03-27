import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, createCompanyAsync, deleteSelectCompanyAsync, fetchCompaniesAsync, getCompaniesByNameAsync, getCompanyByUUIDAsync } from "./api";
import { Company } from "../models/Company";

interface companiesState {
    companies: any[];
    getAllCompaniesState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
    getCompanyByUUIDState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
    selectedCompany: Company | undefined;
    deleteCompanyState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
    companiesByName: Company[];
    getCompaniesByNameState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: companiesState = {
    companies: [],
    getAllCompaniesState: API_STATE.IDLE,
    getCompanyByUUIDState : API_STATE.IDLE,
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

  export const getCompanyByUUID = createAsyncThunk(
    'companies/findCompanyByUUID',
    async(uuid : string, thunkAPI) => {
      const response = await getCompanyByUUIDAsync(uuid)
      return response;
    }
  )

  export const getCompaniesByName = createAsyncThunk(
    'companies/getCompaniesByName',
    async (payload : any, thunkAPI) => {
      const response = await getCompaniesByNameAsync(payload.query)
      return {
        response: response,
        property: payload.property
      }
    },
  )


  export const deleteSelectedCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (company : Company, thunkAPI) => {
      const response = await deleteSelectCompanyAsync(company)
      return response
    },
  )

  export enum CompanyByNameProperty{
    Companies,
    CompaniesByName
  }

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
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
          getCompanyByUUID.fulfilled, (state, action) => {
              state.getCompanyByUUIDState = API_STATE.IDLE
              state.selectedCompany = action.payload
        })

        builder.addCase(
          getCompanyByUUID.pending, (state) => {
            state.getCompanyByUUIDState = API_STATE.LOADING
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
              if(action.payload.property === CompanyByNameProperty.Companies)
                state.companies = action.payload.response
              else
                state.companiesByName = action.payload.response
        })

        builder.addCase(
          getCompaniesByName.pending, (state) => {
            state.getCompaniesByNameState = API_STATE.LOADING
          }
        )
      }
});

export const companiesSelector = (state : RootState ) => state.companies
export const { setSelectedCompany } = companiesSlice.actions

export default companiesSlice.reducer