import { createAction, createReducer } from '@reduxjs/toolkit';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import firebase from '../../utils/firebase';
import api from '../../utils/api';

export const INIT_USER_START = 'userReducer/INIT_USER_START';
export const INIT_USER_SUCCESS = 'userReducer/INIT_USER_SUCCESS';
export const INIT_USER_FAILURE = 'userReducer/INIT_USER_FAILURE';

export const initUserStart = createAction(INIT_USER_START);
export const initUserSuccess = createAction(INIT_USER_SUCCESS);
export const initUserFailure = createAction(INIT_USER_FAILURE);

export function* initUser () {
  try {
    const { email, displayName, photoURL } = yield firebase.loginGoogle();
    const { token, user } = yield api.post('/login', {
      email,
      username: displayName,
      imageSrc: photoURL,
    });

    localStorage.setItem('token', token);
    yield put(initUserSuccess(user));
  } catch (e) {
    yield put(initUserFailure(e));
  }
}

export function* watchInitUserStart () {
  yield takeLatest(INIT_USER_START, initUser);
}

export function* userSagas () {
  yield all([
    call(watchInitUserStart),
  ]);
}

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [INIT_USER_START]: (state, action) => {
    state.loading = true;
  },
  [INIT_USER_SUCCESS]: (state, action) => {
    state.user = action.payload;
    state.loading = false;
  },
  [INIT_USER_FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
