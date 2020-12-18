import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import api from '../../utils/api';
import { watchDeleteMyBoards } from './saga';
import {
  deleteMyBoards,
  deleteMyBoardsSuccess,
} from './slice';

const FAKE_PATH = '/fake';
const FAKE_DATA = 'fakeData';
const FAKE_JSON = { data: FAKE_DATA };
const FAKE_BODY = { body: FAKE_DATA };

beforeEach(() => {
  global.fetch = jest.fn(() => (
    Promise.resolve({
      json: () => Promise.resolve(FAKE_JSON),
    })
  ));
});

afterEach(() => {
  fetch.mockClear();
});

describe('Redux saga test', () => {
  it('deleteMyBoardSaga test', () => {
    const userId = 'user1';
    const boardId = 'board1';

    return expectSaga(watchDeleteMyBoards)
      .provide([[ call(api.delete, FAKE_PATH, FAKE_BODY) ]])
      .put(deleteMyBoardsSuccess(boardId))
      .dispatch(deleteMyBoards({ userId, boardId }))
      .run();
  });

  it('deleteMyBoardsSaga error test', () => {
    const userId = 'user1';
    const boardId = 'board1';
    const error = new Error('Saga error');

    return expectSaga(watchDeleteMyBoards)
      .provide([[ call(api.delete), throwError(error) ]])
      .dispatch(deleteMyBoards({ userId, boardId }))
      .run();
  });
});
