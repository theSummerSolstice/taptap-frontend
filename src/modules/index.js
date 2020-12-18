import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { userSagas } from './user/saga';
import { boardSagas } from './board/saga';
import { socketSagas } from './socket/saga';
import { USER, userReducer } from './user/slice';
import { BOARD, boardReducer } from './board/slice';
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
