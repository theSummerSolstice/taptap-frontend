import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const reducers = {
  addNote: (state, { payload }) => {
    state.push(payload);
  },
};

const name = 'NOTES';
const slice = createSlice({
  name, initialState, reducers,
});

export const NOTES = slice.name;
export const notesReducer = slice.reducer;
export const notesAction = slice.actions;
