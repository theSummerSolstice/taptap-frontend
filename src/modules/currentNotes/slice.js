import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const reducers = {
  getNotes: (state, { payload }) => {
    return payload;
  },
  addNote: (state, { payload }) => {
    state.push(payload);
  },
  deleteNote: (state, { payload }) => {
    return state.filter((state) => {
      return state._id !== payload;
    });
  },
  resetNotes: (state) => {
    return [];
  },
};

const name = 'NOTES';
const slice = createSlice({
  name, initialState, reducers,
});

export const NOTES = slice.name;
export const notesReducer = slice.reducer;
export const notesAction = slice.actions;
