import { createAction } from '@reduxjs/toolkit';
import { takeLatest, put, all, call, getContext } from 'redux-saga/effects';
import firebase from '../../utils/firebase';
import api from '../../utils/api';
import { userAction } from './slice';

const {
  initUser,
  initUserSuccess,
  initUserFailure,
  deleteMyBoards,
  deleteMyBoardsSuccess,
  deleteMyBoardsFailure,
} = userAction;

const GO_TO_MAIN = 'GO_TO_MAIN';
const goToMain = createAction(GO_TO_MAIN);

function* goToMainSaga () {
  const history = yield getContext('history');
  history.push('/');
}

function* initUserSaga () {
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

function* deleteMyBoardsSaga ({ payload }) {
  const { userId, boardId } = payload;

  try {
    yield call(api.delete, `/board/${boardId}`, { userId });
    yield put(deleteMyBoardsSuccess(boardId));
  } catch (error) {
    yield put(deleteMyBoardsFailure(error));
  }
}

export function* watchGoToMain () {
  yield takeLatest(goToMain, goToMainSaga);
}

export function* watchInitUser () {
  yield takeLatest(initUser, initUserSaga);
}

export function* watchDeleteMyBoards () {
  yield takeLatest(deleteMyBoards, deleteMyBoardsSaga);
}

export function* userSagas () {
  yield all([
    call(watchInitUser),
    call(watchGoToMain),
    call(watchDeleteMyBoards),
  ]);
}
