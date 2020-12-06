import { takeLatest, put, all, call } from 'redux-saga/effects';
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

function* initUserSaga () {
  const hasToken = localStorage.getItem('token');

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

export function* watchInitUser () {
  yield takeLatest(initUser, initUserSaga);
}

export function* watchDeleteMyBoards () {
  yield takeLatest(deleteMyBoards, deleteMyBoardsSaga);
}

export function* userSagas () {
  yield all([
    call(watchInitUser),
    call(watchDeleteMyBoards),
  ]);
}
