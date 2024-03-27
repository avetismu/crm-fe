import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_STATE, createCompanyAsync, createContactAsync, editCompanyAsync } from './api';
import { Contact } from '../models/Contact';
import { RootState } from './store';
import { Company } from '../models/Company';

interface CompanyFormState {
    formCompany: {
        uuid : string;
        companyName: string;
        description: string;
        email: {
            value: string;
            error: boolean;
        };
        countryPhoneAreaCode : string;
        phoneNumber: {
            value: string;
            error: boolean;
        };
        whatsappCountryPhoneAreaCode : string;
        whatsappNumber : {
            value: string;
            error: boolean;
        };
        wechatId : {
            value: string;
            error: boolean;
        };
        streetAddress: string;
        city: string;
        province: string;
        country: string;
        contactType: string;
        contactMethod: string;
        lastContact: string | null;
        parentEntity : any;
        subEntities : any[];
        contacts : any[];
    };
    postNewCompanyState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
    editCompanyState : API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: CompanyFormState = {
    formCompany: {
        uuid: '',
        companyName: '',
        description: '',
        email: {
            value: '',
            error: false,
        },
        countryPhoneAreaCode: '',
        phoneNumber: {
            value: '',
            error: false,
        },
        whatsappCountryPhoneAreaCode: '',
        whatsappNumber: {
            value: '',
            error: false,
        },
        wechatId: {
            value: '',
            error: false,
        },
        streetAddress: '',
        city: '',
        province: '',
        country: '',
        contactType : '',
        lastContact : new Date().toDateString(),
        contactMethod : '',
        parentEntity: null,
        subEntities: [],
        contacts: [],
    },
    postNewCompanyState: API_STATE.IDLE,
    editCompanyState : API_STATE.IDLE
};

export const createCompany = createAsyncThunk(
    'companies/createCompany',
    async (formCompany : any, thunkAPI) => {

        const company = Company.fromFormCompany(formCompany);
        const response = await createCompanyAsync(company)
        return response
    },
  )

  export const editCompany = createAsyncThunk(
    'companies/editCompany',
    async (formCompany : any, thunkAPI) => {
        const company = Company.fromFormCompany(formCompany);
        const response = await editCompanyAsync(company)
        return response
    },
  )

const companyFormSlice = createSlice({
    name: 'companyForm',
    initialState,
    reducers: {
        resetFormCompany: () => initialState,
        setFormCompany: (state, action) => {
            return {
                ...state,
                formCompany: {
                    ...state.formCompany,
                    ...action.payload,
                },
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCompany.fulfilled, (state, action) => {
            state.postNewCompanyState = API_STATE.SUCCESS;
        });

        builder.addCase(createCompany.rejected, (state, action) => {
            state.postNewCompanyState = API_STATE.ERROR;
        });

        builder.addCase(createCompany.pending, (state) => {
            state.postNewCompanyState = API_STATE.LOADING;
        });

        builder.addCase(editCompany.fulfilled, (state, action) => {
            state.editCompanyState = API_STATE.SUCCESS;
        });

        builder.addCase(editCompany.rejected, (state, action) => {
            state.editCompanyState = API_STATE.ERROR;
        });

        builder.addCase(editCompany.pending, (state) => {
            state.editCompanyState = API_STATE.LOADING;
        });
    },
    
});

export const { setFormCompany, resetFormCompany } = companyFormSlice.actions;
export default companyFormSlice.reducer;

export const formCompanySelector = (state: RootState) => state.companyForm
export const postNewCompanyStateSelector = (state: RootState) => state.companyForm.postNewCompanyState;