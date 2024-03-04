import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_STATE, fetchContactsAsync } from "./api";

interface contactsState {
    contacts: any[];
    state:string
}

const initialState: contactsState = {
    contacts: [],
    state: API_STATE.IDLE
}

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (page : Number, thunkAPI) => {
      const response = await fetchContactsAsync(page)
      return response
    },
  )

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchContacts.fulfilled, (state, action) => {
                state.state = API_STATE.IDLE
                state.contacts = action.payload
        })
  
        builder.addCase(
            fetchContacts.pending, (state) => {
            state.state = API_STATE.LOADING
          }
        )
      }
});

export const contactsSelector = (state : RootState ) => state.contacts

export default contactsSlice.reducer