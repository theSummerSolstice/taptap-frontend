import { combineReducers } from 'redux';
import { USER, userReducer } from './user/slice';
import { userSagas } from './user/saga';
import { BOARD, boardReducer } from './board/slice';
import { boardSagas } from './board/saga';
import { all } from 'redux-saga/effects';
import { socketSagas } from './socket/saga';
import { NOTES, notesReducer } from './currentNotes/slice';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [BOARD]: boardReducer,
  [NOTES]: notesReducer,
});

export function* rootSaga () {
  yield all([
    userSagas(),
    boardSagas(),
    socketSagas(),
  ]);
}

export default rootReducer;
