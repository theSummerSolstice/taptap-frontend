import { call, all, put, takeLatest } from 'redux-saga/effects';
import {
  updateNoteCategory,
  updateNoteCategorySuccess,
  updateNoteCategoryFailure
} from './slice';
import api from '../../utils/api';

function* updateNoteCategorySaga ({ payload }) {
  const { boardId, currentNotes } = payload;

  try {
    yield call(api.put, `/board/${boardId}/currentNotes`, {
      data: { currentNotes },
      boardId,
    });

    yield put(updateNoteCategorySuccess({ boardId, currentNotes }));
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
