import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Component, ReactInstance } from 'react';

interface AddNewState {
    isVisible : boolean;
    type : AddNewType | undefined;
    title : string | undefined;
}

const initialState: AddNewState = {
    isVisible : false,
    type : undefined,
    title : undefined,
};

const addNewSlice = createSlice({
    name: 'addNew',
    initialState,
    reducers: {
        showAddNew: (state, action) => {
            state.isVisible = true;
            state.type = action.payload
            state.title = getTitle(state.type);
        },
        hideAddNew: (state) => {
            state.isVisible = false;
        }
    }
});

export const { showAddNew, hideAddNew} = addNewSlice.actions;
export default addNewSlice.reducer;
export const addNewSelector = (state: RootState) => state.addNew;

/* Edit Component enum */

export enum AddNewType {
    Contacts
}

const getTitle = (addNewType : AddNewType | undefined) : string | undefined => {

    if (addNewType == undefined)
        return undefined

    switch(addNewType){
        case AddNewType.Contacts:
            return 'Add New Contact'
        default:
            return undefined
    }
}



