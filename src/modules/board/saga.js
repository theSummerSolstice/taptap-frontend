import { createAction } from '@reduxjs/toolkit';
import { call, all, put, takeLatest, getContext, takeEvery } from 'redux-saga/effects';
import api from '../../utils/api';
import { boardSocket } from '../socket/saga';
import html2canvas from 'html2canvas';
import AUTH from '../../constants/auth';
import { updateMyBoards, changeAuthState } from '../user/slice';
import { getNotes, resetNotes } from '../currentNotes/slice';
import {
  createBoard,
  createBoardSuccess,
  createBoardFailure,
  updateBoard,
  updateBoardSuccess,
  updateBoardFailure,
  updateSnapshot,
  updateSnapshotSuccess,
  updateSnapshotFailure,
  getBoard,
  getBoardSuccess,
  getBoardFailure,
  leaveBoard,
  leaveBoardSuccess,
  leaveBoardFailure,
  deleteSnapshots,
  deleteSnapshotsSuccess,
  deleteSnapshotsFailure
} from './slice';

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
    const { board } = yield call(api.put, `/board/${boardId}`, { data });

    yield put(updateBoardSuccess(board));
  } catch (error) {
    yield put(updateBoardFailure(error));
  }
}

function* updateSnapshotSaga ({ payload }) {
  const { data, boardId } = payload;

  try {
    yield call(api.put, `/board/${boardId}/snapshots`, { data });

    yield put(updateSnapshotSuccess(data));
  } catch (error) {
    yield put(updateSnapshotFailure(error));
  }
}

function* getBoardSaga ({ payload }) {
  const { boardId, user } = payload;

  try {
    const { board } = yield call(api.get, `/board/${boardId}`);

    const canEdit = board.owner === user._id
      || board.authorizedUsers.indexOf(user.email) !== -1;

    if (!canEdit && !board.isPublic) {
      yield put(changeAuthState(AUTH.UNAUTHORIZED));
      return;
    }

    if (!canEdit) {
      yield put(changeAuthState(AUTH.READ));
    } else {
      yield call(boardSocket.joinUser, { boardId, user });
      yield put(changeAuthState(AUTH.EDIT));
    }

    yield put(getNotes(board.currentNotes));
    yield put(getBoardSuccess(board));
  } catch (error) {
    yield put(getBoardFailure(error));
  }
}

function* leaveBoardSaga ({ payload }) {
  const { boardId, userId } = payload;

  try {
    const capture = yield html2canvas(document.getElementById('canvas'));
    yield call(api.put, `/board/${boardId}`, {
      data: { imageSrc: capture.toDataURL('image/jpeg') },
    });

    yield call(boardSocket.leaveUser, { boardId, userId });
    yield put(resetNotes());
    yield put(leaveBoardSuccess());
  } catch (error) {
    yield put(leaveBoardFailure(error));
  }
}

function* deleteSnapshotsSaga ({ payload }) {
  const { boardId, index } = payload;

  try {
    yield call(api.delete, `/board/${boardId}/snapshots`, { index });
    yield put(deleteSnapshotsSuccess(index));
  } catch (error) {
    yield put(deleteSnapshotsFailure(error));
  }
}

function* watchGoToBoard () {
  yield takeLatest(goToBoard, goToBoardSaga);
}

function* watchCreateBoard () {
  yield takeLatest(createBoard, createBoardSaga);
}

function* watchUpdateBoard () {
  yield takeLatest(updateBoard, updateBoardSaga);
}

function* watchUpdateSnapshot () {
  yield takeEvery(updateSnapshot, updateSnapshotSaga);
}

function* watchGetBoard () {
  yield takeLatest(getBoard, getBoardSaga);
}

function* watchLeaveBoard () {
  yield takeLatest(leaveBoard, leaveBoardSaga);
}

function* watchDeleteSnapshots () {
  yield takeLatest(deleteSnapshots, deleteSnapshotsSaga);
}

export function* boardSagas () {
  yield all([
    call(watchGoToBoard),
    call(watchCreateBoard),
    call(watchUpdateBoard),
    call(watchUpdateSnapshot),
    call(watchGetBoard),
    call(watchLeaveBoard),
    call(watchDeleteSnapshots),
  ]);
}
