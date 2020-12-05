import { createAction, createReducer } from '@reduxjs/toolkit';
import { takeLatest, put, all, call, getContext } from 'redux-saga/effects';
import firebase from '../utils/firebase';
import api from '../utils/api';

const GO_TO_MAIN = 'userReducer/GO_TO_MAIN';
const INIT_USER_START = 'userReducer/INIT_USER_START';
const INIT_USER_SUCCESS = 'userReducer/INIT_USER_SUCCESS';
const INIT_USER_FAILURE = 'userReducer/INIT_USER_FAILURE';
const UPDATE_MYBOARDS= 'userReducer/UPDATE_MYBOARDS';
const DELETE_MYBOARDS = 'userReducer/DELETE_MYBOARDS';

export const goToMain = createAction(GO_TO_MAIN);
export const initUserStart = createAction(INIT_USER_START);
export const initUserSuccess = createAction(INIT_USER_SUCCESS);
export const initUserFailure = createAction(INIT_USER_FAILURE);
export const updateMyBoards = createAction(UPDATE_MYBOARDS);
export const deleteMyBoards = createAction(DELETE_MYBOARDS);

export function* initUserSaga () {
  const hasToken = localStorage.getItem('token');

  try {
    if (hasToken) {
      const { user } = yield call(api.get, '/user/login/token');
      yield put(initUserSuccess(user));
      yield put(goToMain());
      return;
    }

    const { email, displayName, photoURL } = yield firebase.loginGoogle();
    const { token, user } = yield call(api.post, '/user/login/google', {
      email,
      username: displayName,
      imageSrc: photoURL,
    });

    localStorage.setItem('token', token);
    yield put(initUserSuccess(user));
    yield put(goToMain());
  } catch (error) {
    yield put(initUserFailure(error));
  }
}

function* goToMainSaga () {
  const history = yield getContext('history');
  history.push('/');
}

function* watchInitUserStart () {
  yield takeLatest(INIT_USER_START, initUserSaga);
}

function* watchGoToMain () {
  yield takeLatest(GO_TO_MAIN, goToMainSaga);
}

export function* userSagas () {
  yield all([
    call(watchInitUserStart),
    call(watchGoToMain),
  ]);
}

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [INIT_USER_START]: (state, action) => {
    state.user = null;
    state.loading = true;
    state.error = null;
  },
  [INIT_USER_SUCCESS]: (state, action) => {
    state.user = action.payload;
    state.loading = false;
    state.error = null;
  },
  [INIT_USER_FAILURE]: (state, action) => {
    state.user = null;
    state.loading = false;
    state.error = action.payload;
  },
  [UPDATE_MYBOARDS]: (state, action) => {
    state.user.myBoards.push(action.payload);
  },
  [DELETE_MYBOARDS]: (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        myBoards: state.user.myBoards.filter((board) => {
          return board._id !== action.payload;
        }),
      },
    };
  },
});
