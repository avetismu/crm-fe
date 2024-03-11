import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Component, ReactInstance } from 'react';

interface ViewState {
    isVisible: boolean;
    type: ViewType | undefined;
    title: string | undefined;
}

const initialState: ViewState = {
    isVisible: false,
    type: undefined,
    title: undefined,
};

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        showView: (state, action: PayloadAction<ViewType>) => {
            state.isVisible = true;
            state.type = action.payload;
            state.title = getTitle(state.type);
        },
        hideView: (state) => {
            state.isVisible = false;
        }
    }
});

export const { showView, hideView } = viewSlice.actions;
export default viewSlice.reducer;
export const viewSelector = (state: RootState) => state.view;

/* Edit Component enum */

export enum ViewType {
    Contacts,
    Companies
}

const getTitle = (viewType: ViewType | undefined): string | undefined => {
    if (viewType === undefined)
        return undefined;

    switch (viewType) {
        case ViewType.Contacts:
            return 'View Contact';
        default:
            return undefined;
    }
}