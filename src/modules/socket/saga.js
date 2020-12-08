import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { boardAction } from '../board/slice';
const {
  updateUserList,
} = boardAction;

const socket = io(process.env.REACT_APP_SERVER_URI);

function createSocketChannel (socket) {
  return eventChannel((emit) => {
    socket.on('joinUser', ({ board }) => {
      emit(updateUserList(board));
    });

    socket.on('leaveUser', ({ board }) => {
      emit(updateUserList(board));
    });

    return () => {
      socket.off('joinUser');
    };
  });
}

export function* socketSagas () {
  const channel = yield call(createSocketChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

// emitter
const boardSocket = {
  joinUser(data) {
    socket.emit('joinUser', data);
  },
  leaveUser(data) {
    socket.emit('leaveUser', data);
  },
};

export {
  boardSocket,
};
