import { createAction, createReducer } from '@reduxjs/toolkit';
import api from '../utils/api';
import { call, put, takeLatest, all, getContext } from 'redux-saga/effects';
import { updateMyBoards } from './user.reducer';

const CREATE_BOARD_START = 'boardReducer/CREATE_BOARD';
const CREATE_BOARD_SUCCESS = 'boardReducer/CREATE_BOARD_SUCCESS';
const CREATE_BOARD_FAILURE = 'boardReducer/CREATE_BOARD_FAILURE';
const GO_TO_BOARD = 'boardReducer/GO_TO_BOARD';

export const createBoardStart = createAction(CREATE_BOARD_START);
export const createBoardSuccess = createAction(CREATE_BOARD_SUCCESS);
export const createBoardFailure = createAction(CREATE_BOARD_FAILURE);

export const goToBoard = createAction(GO_TO_BOARD);

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

export function* goToBoardSaga ({ payload }) {
  const history = yield getContext('history');
  const boardId = payload;
  history.push(`/board/${boardId}`);
}

function* watchCreateBoardStart () {
  yield takeLatest(CREATE_BOARD_START, createBoardSaga);
}

function* watchGoToBoard () {
  yield takeLatest(GO_TO_BOARD, goToBoardSaga);
}

export function* boardSagas () {
  yield all([
    call(watchCreateBoardStart),
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
    state.loading = true;
  },
  [CREATE_BOARD_SUCCESS]: (state, action) => {
    state.board = action.payload;
    state.loading = false;
  } ,
  [CREATE_BOARD_FAILURE]: (state, action) => {
    state.error = action.payload;
    state.loading = false;
  },
});
