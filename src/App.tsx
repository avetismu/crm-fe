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

const router = Router

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar></Navbar>
        <RouterProvider router={router}/>
      </div>
    </Provider>
  );
}

export default App;
