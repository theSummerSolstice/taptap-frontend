import { call, all, put, takeLatest } from 'redux-saga/effects';
import api from '../../utils/api';
import {
  updateNoteCategory,
  updateNoteCategorySuccess,
  updateNoteCategoryFailure
 } from './slice';

// FIXME: layout update 분리
function* updateNoteCategorySaga ({ payload }) {
  const { boardId, notes, layout, categories } = payload;

  try {
    yield call(api.put, `/board/${boardId}/currentNotes`, {
      data: { notes, layout },
      boardId,
    });

    yield put(updateNoteCategorySuccess({ boardId, notes, categories }));
  } catch (error) {
    yield put(updateNoteCategoryFailure(error));
  }
}

function* watchUpdateNoteCategory () {
  yield takeLatest(updateNoteCategory, updateNoteCategorySaga);
}

export function* notesSagas () {
  yield all([
    call(watchUpdateNoteCategory),
  ]);
}

