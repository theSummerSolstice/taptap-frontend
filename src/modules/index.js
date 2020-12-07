import { combineReducers } from 'redux';
import { USER, userReducer } from './user/slice';
import { userSagas } from './user/saga';
import { BOARD, boardReducer } from './board/slice';
import { boardSagas } from './board/saga';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [BOARD]: boardReducer,
});

export function* rootSaga () {
  yield all([
    userSagas(),
    boardSagas(),
  ]);
}

export default rootReducer;