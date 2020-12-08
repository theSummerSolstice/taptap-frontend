import { createAction } from '@reduxjs/toolkit';
import { call, all, put, takeLatest, getContext } from 'redux-saga/effects';
import { boardAction } from './slice';
import { userAction } from '../user/slice';
import api from '../../utils/api';
import { boardSocket } from '../socket/saga';

const {
  createBoard,
  createBoardSuccess,
  createBoardFailure,
  updateBoard,
  updateBoardSuccess,
  updateBoardFailure,
  getBoard,
  getBoardSuccess,
  getBoardFailure,
} = boardAction;

const {
  updateMyBoards,
} = userAction;

const GO_TO_BOARD = 'GO_TO_BOARD';
const goToBoard = createAction(GO_TO_BOARD);

function* goToBoardSaga ({ payload }) {
  const boardId = payload;
  const history = yield getContext('history');
  history.push(`/board/${boardId}/invite`);
}

function* createBoardSaga ({ payload }) {
  const boardInfo = payload;

  try {
    const { board } = yield call(api.post, '/board', boardInfo);

    yield put(createBoardSuccess(board));
    yield put(updateMyBoards(board));
    yield put(goToBoard(board._id));
  } catch (error) {
    yield put(createBoardFailure(error));
  }
}

function* updateBoardSaga ({ payload }) {
  const { data, boardId } = payload;

  try {
    yield call(api.put, `/board/${boardId}`, data);

    yield put(updateBoardSuccess(data));
  } catch (error) {
    yield put(updateBoardFailure(error));
  }
}

function* getBoardSaga ({ payload }) {
  const { boardId, user } = payload;

  try {
    const { board } = yield call(api.get, `/board/${boardId}`);

    yield put(getBoardSuccess(board));
    yield call(boardSocket.joinUser, { boardId, user });
  } catch (error) {
    yield put(getBoardFailure(error));
  }
}

export function* watchGoToBoard () {
  yield takeLatest(goToBoard, goToBoardSaga);
}

export function* watchCreateBoard () {
  yield takeLatest(createBoard, createBoardSaga);
}

export function* watchUpdateBoard () {
  yield takeLatest(updateBoard, updateBoardSaga);
}

export function* watchGetBoard () {
  yield takeLatest(getBoard, getBoardSaga);
}

export function* boardSagas () {
  yield all([
    call(watchGoToBoard),
    call(watchCreateBoard),
    call(watchUpdateBoard),
    call(watchGetBoard),
  ]);
}
