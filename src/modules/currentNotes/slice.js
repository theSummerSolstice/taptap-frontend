import { createSlice } from '@reduxjs/toolkit';

// TODO: drag event -> { notes, isDragged toggle로 변경 }
const initialState = [];

const reducers = {
  getNotes: (state, { payload }) => {
    return payload;
  },
  addNote: (state, { payload }) => {
    state.push(payload);
  },
  deleteNote: (state, { payload }) => {
    return state.filter((note) => {
      return note._id !== payload;
    });
  },
  updateNotePosition: (state, { payload }) => {
    return state.map((note) => {
      if (note._id === payload.noteId) {
        return {
          ...note,
          position: {
            ...payload.position,
          },
        };
      }
      return note;
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
