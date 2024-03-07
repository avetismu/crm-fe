import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Component } from 'react';

interface EditState {
    isVisible : boolean;
    type : EditType | undefined;
    title : string | undefined;
}

const initialState: EditState = {
    isVisible : false,
    type : undefined,
    title : undefined
};

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        showEdit: (state, action) => {
            state.isVisible = true;
            state.type = action.payload
            state.title = getTitle(state.type);
        },
        hideEdit: (state) => {
            state.isVisible = false;
        }
    }
});

export const { showEdit, hideEdit} = editSlice.actions;
export default editSlice.reducer;
export const editSelector = (state: RootState) => state.edit;

/* Edit Component enum */

export enum EditType {
    Contacts
}

const getTitle = (editType : EditType | undefined) : string | undefined => {

    if (editType == undefined)
        return undefined

    switch(editType){
        case EditType.Contacts:
            return 'Contacts'
        default:
            return undefined
    }
}



