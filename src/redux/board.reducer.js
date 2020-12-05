import { createAction, createReducer } from '@reduxjs/toolkit';
import api from '../utils/api';
import { call, put, takeLatest, all, getContext } from 'redux-saga/effects';
import { updateMyBoards, deleteMyBoards } from './user.reducer';

const GO_TO_BOARD = 'boardReducer/GO_TO_BOARD';

const CREATE_BOARD_START = 'boardReducer/CREATE_BOARD';
const CREATE_BOARD_SUCCESS = 'boardReducer/CREATE_BOARD_SUCCESS';
const CREATE_BOARD_FAILURE = 'boardReducer/CREATE_BOARD_FAILURE';

const DELETE_BOARD_START = 'boardReducer/DELETE_BOARD_START';
const DELETE_BOARD_SUCCESS = 'boardReducer/DELETE_BOARD_SUCCESS';
const DELETE_BOARD_FAILURE = 'boardReducer/DELETE_BOARD_FAILURE';

export const goToBoard = createAction(GO_TO_BOARD);

export const createBoardStart = createAction(CREATE_BOARD_START);
export const createBoardSuccess = createAction(CREATE_BOARD_SUCCESS);
export const createBoardFailure = createAction(CREATE_BOARD_FAILURE);

export const deleteBoardStart = createAction(DELETE_BOARD_START);
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS);
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE);

export function* goToBoardSaga ({ payload }) {
  const history = yield getContext('history');
  const boardId = payload;
  history.push(`/board/${boardId}`);
}

export function* createBoardSaga ({ payload }) {
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

export function* deleteBoardSaga ({ payload }) {
  const { userId, boardId } = payload;

  try {
    yield call(api.delete, '/board', { userId, boardId });
    yield put(deleteMyBoards(boardId));
  } catch (error) {
    yield put(deleteBoardFailure(error));
  }
}

function* watchCreateBoardStart () {
  yield takeLatest(CREATE_BOARD_START, createBoardSaga);
}

function* watchDeleteBoardStart () {
  yield takeLatest(DELETE_BOARD_START, deleteBoardSaga);
}

function* watchGoToBoard () {
  yield takeLatest(GO_TO_BOARD, goToBoardSaga);
}

export function* boardSagas () {
  yield all([
    call(watchCreateBoardStart),
    call(watchDeleteBoardStart),
    call(watchGoToBoard),
  ]);
}

const initialState = {
  board: null,
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [CREATE_BOARD_START]: (state, action) => {
    state.board = null;
    state.loading = true;
    state.error = null;
  },
  [CREATE_BOARD_SUCCESS]: (state, action) => {
    state.board = action.payload;
    state.loading = false;
    state.error = null;
  },
  [CREATE_BOARD_FAILURE]: (state, action) => {
    state.board = null;
    state.loading = false;
    state.error = action.payload;
  },
  [DELETE_BOARD_FAILURE]: (state, action) => {
    state.board = null;
    state.loading = false;
    state.error = action.payload;
  },
});
