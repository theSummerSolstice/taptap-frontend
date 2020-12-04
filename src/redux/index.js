import { combineReducers } from 'redux';
import userReducer, { userSagas } from './user/user.reducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  userReducer,
});

export function* rootSaga () {
  yield all([userSagas()]);
}

export default rootReducer;
