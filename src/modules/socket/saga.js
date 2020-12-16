import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { changeAuthState } from '../user/slice';
import { updateUserList, updateBoardSettings } from '../board/slice';
import {
  getNotes,
  addNote,
  deleteNote,
  updateNotePosition,
  addCategory,
  deleteCategory,
  updateLayout,
} from '../currentNotes/slice';

const socket = io(process.env.REACT_APP_SERVER_URI);

function createSocketChannel (socket) {
  return eventChannel((emit) => {
    socket.on('joinUser', ({ board }) => {
      emit(updateUserList(board));
      toast.info('🥳 Welcome to join! Yeah!', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        progress: undefined,
      });
    });

    socket.on('leaveUser', ({ board }) => {
      emit(updateUserList(board));
    });

    socket.on('addNote', ({ note }) => {
      emit(addNote(note));
    });

    socket.on('deleteNote', ({ noteId }) => {
      emit(deleteNote(noteId));
    });

    socket.on('updateNotePosition', ({ noteId, position }) => {
      emit(updateNotePosition({ noteId, position }));
    });

    socket.on('historyModeOn', ({ data }) => {
      emit(changeAuthState(data));
    });

    socket.on('historyModeOff', ({ data }) => {
      emit(changeAuthState(data));
    });

    socket.on('selectVersion', ({ notes }) => {
      emit(getNotes(notes));
    });

    socket.on('startCategorize', ({ data }) => {
      emit(updateBoardSettings(data));
    });

    socket.on('addCategory', ({ categoryName, layout }) => {
      emit(addCategory({ categoryName, layout }));
    });

    socket.on('deleteCategory', ({ index, layout }) => {
      emit(deleteCategory({ index, layout }));
    });

    socket.on('updateLayout', ({ layout }) => {
      emit(updateLayout(layout));
    });

    return () => {
      socket.off('joinUser');
      socket.off('leaveUser');
      socket.off('addNote');
      socket.off('deleteNote');
      socket.off('updateNotePosition');
      socket.off('historyModeOn');
      socket.off('historyModeOff');
      socket.off('selectVersion');
      socket.off('startCategorize');
      socket.off('addCategory');
      socket.off('deleteCategory');
      socket.off('updateLayout');
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
  addNote(data) {
    socket.emit('addNote', data);
  },
  updateNotePosition(data) {
    socket.emit('updateNotePosition', data);
  },
  deleteNote(data) {
    socket.emit('deleteNote', data);
  },
  historyModeOn(data) {
    socket.emit('historyModeOn', data);
  },
  historyModeOff(data) {
    socket.emit('historyModeOff', data);
  },
  selectVersion(data) {
    socket.emit('selectVersion', data);
  },
  startCategorize(data) {
    socket.emit('startCategorize', data);
  },
  addCategory(data) {
    socket.emit('addCategory', data);
  },
  deleteCategory(data) {
    socket.emit('deleteCategory', data);
  },
  updateLayout(data) {
    socket.emit('updateLayout', data);
  },
};

export {
  boardSocket,
};
