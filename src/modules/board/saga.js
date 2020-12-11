import { createAction } from '@reduxjs/toolkit';
import { call, all, put, takeLatest, getContext } from 'redux-saga/effects';
import { boardAction } from './slice';
import { userAction } from '../user/slice';
import api from '../../utils/api';
import { boardSocket } from '../socket/saga';
import { notesAction } from '../currentNotes/slice';
import html2canvas from 'html2canvas';

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
  leaveBoard,
  leaveBoardSuccess,
  leaveBoardFailure,
} = boardAction;

const {
  updateMyBoards,
  changeAuthState,
  updateAuthorizedBoards,
} = userAction;

const {
  getNotes,
  resetNotes,
} = notesAction;

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
  const { data, boardId, updatedItem } = payload;

  try {
    yield call(api.put, `/board/${boardId}`, { data, updatedItem });
    yield put(updateBoardSuccess({ data, updatedItem }));
  } catch (error) {
    yield put(updateBoardFailure(error));
  }
}

function* getBoardSaga ({ payload }) {
  const { boardId, user } = payload;

  try {
    const { board } = yield call(api.get, `/board/${boardId}`);

    if (board.owner !== user._id && board.authorizedUsers.indexOf(user.email) === -1) {
      yield put(changeAuthState('READ'));
    } else {
      yield call(boardSocket.joinUser, { boardId, user });
      yield put(changeAuthState('EDIT'));
    }

    yield put(getBoardSuccess(board));
    yield put(getNotes(board.currentNotes));
  } catch (error) {
    yield put(getBoardFailure(error));
  }
}

function* leaveBoardSaga ({ payload }) {
  const { boardId, userId } = payload;

  try {
    const capture = yield html2canvas(document.getElementById('canvas'));
    yield call(api.put, `/board/${boardId}`, {
      data: capture.toDataURL('image/jpeg'),
      boardId,
      updatedItem: 'imageSrc'
    });

    yield call(boardSocket.leaveUser, { boardId, userId });
    yield put(resetNotes());
    yield put(leaveBoardSuccess());
  } catch (error) {
    yield put(leaveBoardFailure(error));
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

export function* watchLeaveBoard () {
  yield takeLatest(leaveBoard, leaveBoardSaga);
}

export function* boardSagas () {
  yield all([
    call(watchGoToBoard),
    call(watchCreateBoard),
    call(watchUpdateBoard),
    call(watchGetBoard),
    call(watchLeaveBoard),
  ]);
}
