import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash';

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
  updateNotePosition: (state, { payload }) => {
    const clone = cloneDeep(state.map((item) => {
      if (item._id === payload.noteId) {
        return {
          ...item,
          position: payload.position,
        };
      }
      return item;
    }));

    return clone.value();
  },
  // updateNotePosition: (state, { payload }) => {
  //   return state.map((state) => {
  //     if (state._id === payload.noteId) {
  //       return {
  //         ...state,
  //         position: Object.assign({}, payload.position),
  //       };
  //     }
  //     return state;
  //   });
  // },
  // updateNotePosition: (state, { payload }) => {
  //   return state.map((item) => {
  //     if (item._id === payload.noteId) {
  //       return {
  //         ...state,
  //        _id: item._id+item._id,
  //         position: payload.position,
  //       };
  //     }
  //     return item;
  //   });
  // },
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
