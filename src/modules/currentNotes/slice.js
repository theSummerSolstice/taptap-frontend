import { createSlice, createSelector } from '@reduxjs/toolkit';

// TODO: drag event -> { notes, isDragged toggle로 변경 }
const initialState = {
  notes: [],
  isDragged: true,
  categories: [],
  columns: null,
  layout: [],
};

const reducers = {
  getNotes: (state, { payload }) => {
    state.notes = payload;
  },
  addNote: (state, { payload }) => {
    state.notes.push(payload);
  },
  deleteNote: (state, { payload }) => {
    return {
      ...state,
      notes: state.notes.filter((note) => {
        return note._id !== payload;
      }),
    };
  },
  updateNotePosition: (state, { payload }) => {
    return {
      ...state,
      notes: state.notes.map((note) => {
        if (note._id === payload.noteId) {
          return {
            ...note,
            position: {
              ...payload.position,
            },
          };
        }
        return note;
      }),
    };
  },
  resetNotes: (state) => {
    state.notes = [];
  },
};

const name = 'NOTES';
const slice = createSlice({
  name, initialState, reducers,
});

const selectAllState = createSelector(
  (state) => state.notes,
  (state) => state.isDragged,
  (state) => state.categories,
  (state) => state.columns,
  (state) => state.layout,
  (notes, isDragged, categories, columns, layout) => {
    return { notes, isDragged, categories, columns, layout };
  },
);

export const notesSelector = {
  all: (state) => selectAllState(state[NOTES]),
};

export const NOTES = slice.name;
export const notesReducer = slice.reducer;
export const notesAction = slice.actions;
