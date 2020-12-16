import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import toast from '../../utils/toast';
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
import EVENT from '../../constants/socketEvent';

const socket = io(process.env.REACT_APP_SERVER_URI);

function createSocketChannel (socket) {
  return eventChannel((emit) => {
    socket.on(EVENT.JOIN_USER, ({ board }) => {
      emit(updateUserList(board));
      toast.joinBoard();
    });

    socket.on(EVENT.LEAVE_USER, ({ board }) => {
      emit(updateUserList(board));
    });

    socket.on(EVENT.ADD_NOTE, ({ note }) => {
      emit(addNote(note));
    });

    socket.on(EVENT.DELETE_NOTE, ({ noteId }) => {
      emit(deleteNote(noteId));
    });

    socket.on(EVENT.UPDATE_NOTE_POSITION, ({ noteId, position }) => {
      emit(updateNotePosition({ noteId, position }));
    });

    socket.on(EVENT.HISTORY_MODE_ON, ({ data }) => {
      emit(changeAuthState(data));
    });

    socket.on(EVENT.HISTORY_MODE_OFF, ({ data }) => {
      emit(changeAuthState(data));
    });

    socket.on(EVENT.SELECT_VERSION, ({ notes }) => {
      emit(getNotes(notes));
    });

    socket.on(EVENT.START_CATEGORIZE, ({ data }) => {
      emit(updateBoardSettings(data));
    });

    socket.on(EVENT.ADD_CATEGORY, ({ categoryName, layout }) => {
      emit(addCategory({ categoryName, layout }));
    });

    socket.on(EVENT.DELETE_CATEGORY, ({ index, layout }) => {
      emit(deleteCategory({ index, layout }));
    });

    socket.on(EVENT.UPDATE_LAYOUT, ({ layout }) => {
      emit(updateLayout(layout));
    });

    return () => {
      socket.off(EVENT.JOIN_USER);
      socket.off(EVENT.LEAVE_USER);
      socket.off(EVENT.ADD_NOTE);
      socket.off(EVENT.DELETE_NOTE);
      socket.off(EVENT.UPDATE_NOTE_POSITION);
      socket.off(EVENT.HISTORY_MODE_ON);
      socket.off(EVENT.HISTORY_MODE_OFF);
      socket.off(EVENT.SELECT_VERSION);
      socket.off(EVENT.START_CATEGORIZE);
      socket.off(EVENT.ADD_CATEGORY);
      socket.off(EVENT.DELETE_CATEGORY);
      socket.off(EVENT.UPDATE_LAYOUT);
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

const boardSocket = {
  joinUser(data) {
    socket.emit(EVENT.JOIN_USER, data);
  },
  leaveUser(data) {
    socket.emit(EVENT.LEAVE_USER, data);
  },
  addNote(data) {
    socket.emit(EVENT.ADD_NOTE, data);
  },
  updateNotePosition(data) {
    socket.emit(EVENT.UPDATE_NOTE_POSITION, data);
  },
  deleteNote(data) {
    socket.emit(EVENT.DELETE_NOTE, data);
  },
  historyModeOn(data) {
    socket.emit(EVENT.HISTORY_MODE_ON, data);
  },
  historyModeOff(data) {
    socket.emit(EVENT.HISTORY_MODE_OFF, data);
  },
  selectVersion(data) {
    socket.emit(EVENT.SELECT_VERSION, data);
  },
  startCategorize(data) {
    socket.emit(EVENT.START_CATEGORIZE, data);
  },
  addCategory(data) {
    socket.emit(EVENT.ADD_CATEGORY, data);
  },
  deleteCategory(data) {
    socket.emit(EVENT.DELETE_CATEGORY, data);
  },
  updateLayout(data) {
    socket.emit(EVENT.UPDATE_LAYOUT, data);
  },
};

export {
  boardSocket,
};
