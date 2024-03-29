import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contactsSlice';
import editSlice from './editSlice';
import addNewSlice from './addNewSlice';
import viewSlice from './viewSlice';
import companiesSlice from './companiesSlice';
import contactFormSlice from './contactFormSlice';
import companyFormSlice from './companyFormSlice';
import productsSlice from './productsSlice';
import productFormSlice from './productFormSlice';
import dialogSlice from './dialogSlice';

const store = configureStore({
    reducer: {
      contacts: contactsSlice,
      companies: companiesSlice,
      products: productsSlice,
      edit : editSlice,
      addNew : addNewSlice,
      view : viewSlice,
      dialog : dialogSlice,
      companyForm : companyFormSlice,
      contactForm : contactFormSlice,
      productForm : productFormSlice
    },
      
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  
  export default store;