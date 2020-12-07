import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  board: null,
  error: null,
};

const reducers = {
  createBoard: (state) => {
    state.loading = true;
  },
  createBoardSuccess: (state, { payload }) => {
    state.loading = false;
    state.board = payload;
  },
  createBoardFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  updateBoard: (state) => {
    state.loading = true;
  },
  updateBoardSuccess: (state, { payload }) => {
    state.loading = false;
    state.board.authorizedUsers = payload;
  },
  updateBoardFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  getBoard: (state) => {
    state.loading = true;
  },
  getBoardSuccess: (state, { payload }) => {
    state.loading = false;
    state.board = payload;
  },
  getBoardFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  leaveBoard: (state) => {
    state.board = null;
  },
};

const name = 'BOARD';
const slice = createSlice({
  name, initialState, reducers,
});

const selectAllState = createSelector(
  (state) => state.loading,
  (state) => state.board,
  (state) => state.error,
  (loading, board, error) => {
    return { loading, board, error };
  }
);

export const boardSelector = {
  all: (state) => selectAllState(state[BOARD]),
};

export const BOARD = slice.name;
export const boardReducer = slice.reducer;
export const boardAction = slice.actions;
