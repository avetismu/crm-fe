import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_STATE, createContactAsync, editContactAsync } from './api';
import { Contact } from '../models/Contact';
import { RootState } from './store';

interface ContactFormState {
    formContact: {
        uuid : string,
        firstName: string;
        lastName: string;
        description: string;
        company: any | null | undefined;
        email: {
          value: string;
          error: boolean;
        };
        countryPhoneAreaCode: string | null;
        phoneNumber: {
          value: string;
          error: boolean;
        };
        whatsappCountryPhoneAreaCode: string | null;
        whatsappNumber: {
          value: string;
          error: boolean;
        };
        wechatId: {
          value: string;
          error: boolean;
        };
        streetAddress: string;
        city: string;
        province: string;
        country: string;
        contactType: string | null;
        lastContact: string | null;
        contactMethod: string | null;
      },
      postNewContactState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
      editContactState :  API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: ContactFormState = {
    formContact : {
        uuid : '',
        firstName: '',
        lastName: '',
        description: '',
        company: '',
        email: {
          value: '',
          error: false
        },
        countryPhoneAreaCode: null,
        phoneNumber: {
          value: '',
          error: false
        },
        whatsappCountryPhoneAreaCode: null,
        whatsappNumber: {
          value: '',
          error: false
        },
        wechatId: {
          value: '',
          error: false
        },
        streetAddress: '',
        city: '',
        province: '',
        country: '',
        contactType: '',
        lastContact:  new Date().toDateString(),
        contactMethod: ''
      },
      postNewContactState: API_STATE.IDLE,
      editContactState: API_STATE.IDLE
};


export const createContact = createAsyncThunk(
    'contacts/createContact',
    async (formContact : any, thunkAPI) => {

      const contact = Contact.fromFormContact(formContact);

      const response = await createContactAsync(contact as Contact)
      return response
    },
  )

  export const editContact = createAsyncThunk(
    'contacts/editContact',
    async (formContact : any, thunkAPI) => {

      const contact = Contact.fromFormContact(formContact);

      const response = await editContactAsync(contact as Contact)
      return response
    },
  )

const contactFormSlice = createSlice({
    name: 'contactForm',
    initialState,
    reducers: {
        setFormContact: (state, action) => {
          console.log('action', action)
            return {
              ...state,
              formContact: {
                ...state.formContact,
                ...action.payload
              }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            createContact.fulfilled, (state, action) => {
                state.postNewContactState = API_STATE.SUCCESS
              }
          )
  
          builder.addCase(
            createContact.rejected, (state, action) => {
              state.postNewContactState = API_STATE.ERROR
            }
          )
  
          builder.addCase(
            createContact.pending, (state) => {
              state.postNewContactState = API_STATE.LOADING
            }
          )

          builder.addCase(
            editContact.fulfilled, (state, action) => {
                state.editContactState = API_STATE.SUCCESS
              }
          )
  
          builder.addCase(
            editContact.rejected, (state, action) => {
              state.editContactState = API_STATE.ERROR
            }
          )
  
          builder.addCase(
            editContact.pending, (state) => {
              state.editContactState = API_STATE.LOADING
            }
          )
    }
});

export const { setFormContact } = contactFormSlice.actions;
export default contactFormSlice.reducer;

export const formContactSelector = (state : RootState) => state.contactForm
export const postNewContactStateSelector = (state : RootState) => state.contactForm.postNewContactState