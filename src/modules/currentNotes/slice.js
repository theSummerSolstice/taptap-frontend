import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  notes: [],
  categories: ['unsorted'],
  layout: [{ i: '0', x: 0, y: 0, w: 1, h: 0.3, static: true, minW: 1 }],
  error: null,
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
            position: payload.position,
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
    state.categories.concat(payload.categories);
    state.layout.concat(payload.layout);
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
  updateNoteCategory: (state, { payload }) => {
    state.loading = true;
  },
  updateNoteCategorySuccess: (state, { payload }) => {
    return {
      ...state,
      loading: false,
      categories: payload.categories,
      notes: [
        ...payload.notes,
      ],
    };
  },
  updateNoteCategoryFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
};

const name = 'NOTES';
const slice = createSlice({
  name,
  initialState,
  reducers,
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
export const {
  getNotes,
  addNote,
  deleteNote,
  updateNotePosition,
  resetNotes,
  initializeCategory,
  addCategory,
  deleteCategory,
  updateLayout,
  updateNoteCategory,
  updateNoteCategorySuccess,
  updateNoteCategoryFailure,
} = slice.actions;
