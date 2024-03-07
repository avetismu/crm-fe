import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, createContactAsync, fetchContactsAsync } from "./api";
import { Contact } from "../models/Contact";

interface contactsState {
    contacts: Contact[];
    getAllContactsState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
    newContact: Contact
    postNewContactState: API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR | API_STATE.SUCCESS;
}

const initialState: contactsState = {
    contacts: [],
    getAllContactsState: API_STATE.IDLE,
    newContact: new Contact(),
    postNewContactState: API_STATE.IDLE
}

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (page : Number, thunkAPI) => {
      const response = await fetchContactsAsync(page)
      return response
    },
  )

export const createContact = createAsyncThunk(
    'contacts/createContact',
    async (contact : Contact, thunkAPI) => {
      const response = await createContactAsync(contact)
      return response
    },
  )

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setNewContact: (state, action) => {
            state.newContact = action.payload
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
      }
});

export const contactsSelector = (state : RootState ) => state.contacts
export const { setNewContact } = contactsSlice.actions

export default contactsSlice.reducer