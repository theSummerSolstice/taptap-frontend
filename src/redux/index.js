import { combineReducers } from 'redux';
import userReducer, { userSagas } from './user.reducer';
import boardReducer, { boardSagas } from './board.reducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  userReducer,
  boardReducer,
});

export function* rootSaga () {
  yield all([userSagas(), boardSagas()]);
}

export default rootReducer;
