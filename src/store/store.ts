import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contactsSlice';
import editSlice from './editSlice';
import addNewSlice from './addNewSlice';
const store = configureStore({
    reducer: {
      contacts: contactsSlice,
      edit : editSlice,
      addNew : addNewSlice
    },
      
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  
  export default store;