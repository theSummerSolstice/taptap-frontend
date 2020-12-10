import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
  auth: null,
};

const reducers = {
  initUser: (state) => {
    state.loading = true;
  },
  initUserSuccess: (state, { payload }) => {
    state.loading = false;
    state.user = payload;
  },
  initUserFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  logoutUser: (state) => {
    state.loading = true;
  },
  logoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
  },
  logoutUserFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  updateMyBoards: (state, { payload }) => {
    state.user.myBoards.push(payload);
  },
  deleteMyBoards: (state) => {
    state.loading = true;
  },
  deleteMyBoardsSuccess: (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        myBoards: state.user.myBoards.filter((board) => {
          return board._id !== payload;
        }),
      },
    };
  },
  deleteMyBoardsFailure: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  updateAuthorizedBoards: (state, { payload }) => {
    state.user.authorizedBoards.push(payload);
  },
  changeAuthState: (state, { payload }) => {
    state.auth = payload;
  },
};

const name = 'USER';
const slice = createSlice({
  name, initialState, reducers,
});

const selectAllState = createSelector(
  (state) => state.loading,
  (state) => state.user,
  (state) => state.error,
  (state) => state.auth,
  (loading, user, error, auth) => {
    return { loading, user, error, auth };
  }
);

export const userSelector = {
  all: (state) => selectAllState(state[USER]),
};

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userAction = slice.actions;
