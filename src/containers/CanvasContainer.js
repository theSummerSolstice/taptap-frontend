import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector } from '../modules/board/slice';
import BoardCanvas from '../components/BoardCanvas';
import { boardSocket } from '../modules/socket/saga';

const CanvasContainer = () => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const notes = useSelector((state) => state.NOTES);

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const updateNotePosition = (boardId, noteId, position) => {
    boardSocket.updateNotePosition({ boardId, noteId, position });
  };

  return (
    <BoardCanvas
      boardId={board._id}
      notes={notes}
      user={user}
      auth={auth}
      addNote={addNote}
      deleteNote={deleteNote}
      updateNotePosition={updateNotePosition}
    />
  );
};

export default CanvasContainer;
