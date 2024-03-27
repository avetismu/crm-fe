import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, createContactAsync, deleteSelectedContactAsync, fetchContactsAsync, getContactByUUIDAsync, getContactsByNameAsync } from "./api";
import { Contact } from "../models/Contact";

interface contactsState {
    contacts: any[];
    getAllContactsState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR
    getContactsByNameState : API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR
    getContactByUUIDState : API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR
    selectedContact: any;
    deleteContactState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: contactsState = {
    contacts: [],
    getAllContactsState: API_STATE.IDLE,
    getContactsByNameState : API_STATE.IDLE,
    getContactByUUIDState : API_STATE.IDLE,
    selectedContact: undefined,
    deleteContactState:API_STATE.IDLE,
}

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (page : Number, thunkAPI) => {
      const response = await fetchContactsAsync(page)
      return response
    },
  )

  export const getContactsByName = createAsyncThunk(
    'contacts/getContactsByName',
    async(payload : any, thunkAPI) => {
      const response = await getContactsByNameAsync(payload.query)
      return {
        response : response,
        property : payload.property
      }
    }
  )

  export const getContactByUUID = createAsyncThunk(
    'contacts/getContactByUUID',
    async(uuid : string, thunkAPI) => {
      const response = await getContactByUUIDAsync(uuid)
      return response
    }
  )


  export const deleteSelectedContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contact : Contact, thunkAPI) => {
      const response = await deleteSelectedContactAsync(contact)
      return response
    },
  )

  export enum ContactByNameProperty{
    Contacts
  }

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setSelectedContact : (state, action) => {
            return {
              ...state, 
              selectedContact : state.contacts.find(contact => contact.uuid === action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchContacts.fulfilled, (state, action) => {
                state.getAllContactsState = API_STATE.IDLE
                state.contacts = action.payload
        })
  
        builder.addCase(
            fetchContacts.pending, (state) => {
            state.getAllContactsState = API_STATE.LOADING
          }
        )

        builder.addCase(
          getContactsByName.fulfilled, (state, action) => {
              state.getContactsByNameState = API_STATE.IDLE
              if (action.payload.property == ContactByNameProperty.Contacts)
                state.contacts = action.payload.response
        })

        builder.addCase(
          getContactsByName.pending, (state) => {
            state.getContactsByNameState = API_STATE.LOADING
          }
        )

        builder.addCase(
          getContactByUUID.fulfilled, (state, action) => {
              state.getAllContactsState = API_STATE.IDLE
              state.selectedContact = action.payload
        })

        builder.addCase(
          getContactByUUID.pending, (state) => {
            state.getAllContactsState = API_STATE.LOADING
          }
        )

        builder.addCase(
          deleteSelectedContact.fulfilled, (state, action) => {
            state.deleteContactState = API_STATE.SUCCESS
          }
        )

        builder.addCase(
          deleteSelectedContact.rejected, (state, action) => {
            state.deleteContactState = API_STATE.ERROR
          }
        )

        builder.addCase(
          deleteSelectedContact.pending, (state) => {
            state.deleteContactState = API_STATE.LOADING
          }
        )
      }
});

export const contactsSelector = (state : RootState ) => state.contacts
export const { setSelectedContact } = contactsSlice.actions

export default contactsSlice.reducer