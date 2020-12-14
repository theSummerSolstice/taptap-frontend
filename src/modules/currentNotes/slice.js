import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  categories: [],
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
            _id: note._id,
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
  initializeCategory: (state, { payload }) => {
    state.categories = payload.categories;
    state.layout = payload.layout;
  },
  addCategory: (state, { payload }) => {
    state.categories.push(payload.categoryName);
    state.layout = payload.layout;
  },
  deleteCategory: (state, { payload }) => {
    return {
      ...state,
      categories: state.categories.filter((item, index) => (
        payload.index !== String(index)
      )),
      layout: payload.layout,
    };
  },
  updateLayout: (state, { payload }) => {
    state.layout = payload;
  },
};

const name = 'NOTES';
const slice = createSlice({
  name, initialState, reducers,
});

const selectAllState = createSelector(
  (state) => state.notes,
  (state) => state.categories,
  (state) => state.layout,
  (notes, categories, layout) => {
    return { notes, categories, layout };
  },
);

export const notesSelector = {
  all: (state) => selectAllState(state[NOTES]),
};

export const NOTES = slice.name;
export const notesReducer = slice.reducer;
export const notesAction = slice.actions;
