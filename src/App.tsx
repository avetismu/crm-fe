import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './store/store';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import EditComponent from './components/Edit/EditComponent';
import AddNewComponent from './components/AddNew/AddNewComponent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ViewComponent from './components/View/ViewComponent';

const router = Router

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <RouterProvider router={router}/>
        <div className="App">
          <Navbar></Navbar>
          <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0
          }}
          >
            <Toolbar />
            <List>
              <ListItemButton LinkComponent='a' href='/contacts'>
                <ListItemIcon>
                  <ContactPageIcon/>
                </ListItemIcon>
                <ListItemText>
                  Contacts
                </ListItemText>
              </ListItemButton>
              <ListItemButton  LinkComponent='a' href='/companies'>
                <ListItemIcon>
                  <BusinessIcon/>
                </ListItemIcon>
                <ListItemText>
                  Companies
                </ListItemText>
              </ListItemButton>
              <ListItemButton  LinkComponent='a' href='/products'>
                <ListItemIcon>
                  <InventoryIcon/>
                </ListItemIcon>
                <ListItemText>
                  Products
                </ListItemText>
              </ListItemButton>
            </List>
            <Divider/>
          </Drawer>
          <BrowserRouter>
            <EditComponent/>
            <AddNewComponent/>
            <ViewComponent/>
          </BrowserRouter>
        </div>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
