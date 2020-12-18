import { takeLatest, put, all, call, getContext } from 'redux-saga/effects';
import firebase from '../../utils/firebase';
import {
  initUser,
  initUserSuccess,
  initUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  deleteMyBoards,
  deleteMyBoardsSuccess,
  deleteMyBoardsFailure,
} from './slice';
import api from '../../utils/api';

function* initUserSaga () {
  const hasToken = localStorage.getItem('token');
  const hasBoardId = localStorage.getItem('boardId');

  try {
    if (hasToken) {
      const { user } = yield call(api.get, '/user/login/token');
      yield put(initUserSuccess(user));
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

    if (hasBoardId) {
      const history = yield getContext('history');
      history.push(`/board/${hasBoardId}`);
    }
  } catch (error) {
    yield put(initUserFailure(error));
  }
}

function* logoutUserSaga () {
  const token = localStorage.getItem('token');

  try {
    yield firebase.logoutGoogle();
    localStorage.removeItem('token', token);
    yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserFailure(error));
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

function* watchInitUser () {
  yield takeLatest(initUser, initUserSaga);
}

function* watchLogoutUser () {
  yield takeLatest(logoutUser, logoutUserSaga);
}

function* watchDeleteMyBoards () {
  yield takeLatest(deleteMyBoards, deleteMyBoardsSaga);
}

export function* userSagas () {
  yield all([
    call(watchInitUser),
    call(watchLogoutUser),
    call(watchDeleteMyBoards),
  ]);
}
