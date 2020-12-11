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
    state.board[payload.updatedItem] = payload.data;
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
    state.loading = true;
  },
  leaveBoardSuccess: (state) => {
    state.loading = false;
    state.board = null;
  },
  leaveBoardFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  updateUserList: (state, { payload }) => {
    state.board = payload;
  },
  updateSnapshots: (state, { payload }) => {
    state.loading = false;
    state.board[payload.updatedItem].push(payload.data);
  },
  storeCurrentNotes: (state, { payload }) => {
    state.board.currentNotes = payload;
  },
  deleteSnapshots: (state) => {
    state.loading = true;
  },
  deleteSnapshotsSuccess: (state, { payload }) => {
    return {
      ...state,
      loading: false,
      board: {
        ...state.board,
        snapshots: state.board.snapshots.slice(0, payload),
      },
    };
  },
  deleteSnapshotsFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
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
