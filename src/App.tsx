import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import {
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './store/store';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BusinessIcon from '@mui/icons-material/Business';
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
              <ListItemButton>
                <ListItemIcon>
                  <ContactPageIcon/>
                </ListItemIcon>
                <ListItemText>
                  Contacts
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <BusinessIcon/>
                </ListItemIcon>
                <ListItemText>
                  Companies
                </ListItemText>
              </ListItemButton>
            </List>
            <Divider/>
          </Drawer>
          <RouterProvider router={router}/>
          <EditComponent/>
          <AddNewComponent/>
          <ViewComponent/>
        </div>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
