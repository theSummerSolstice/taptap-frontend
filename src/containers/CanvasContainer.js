import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, boardAction } from '../modules/board/slice';
import BoardCanvas from '../components/BoardCanvas';
import { boardSocket } from '../modules/socket/saga';
import CategorizeCanvas from '../components/CategorizeCanvas';

const {
  updateBoardSettings,
} = boardAction;

const CanvasContainer = () => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const notes = useSelector((state) => state.NOTES);
  const dispatch = useDispatch();

  const addNote = (note) => boardSocket.addNote(note);
  const deleteNote = (noteId) => boardSocket.deleteNote(noteId);
  const updateNotePosition = (boardId, noteId, position) => {
    boardSocket.updateNotePosition({ boardId, noteId, position });
  };

  const handleCategorize = () => {
    dispatch(updateBoardSettings(board.isCategorized));
  };

  return (
    <>
      {
        board.isCategorized
          ? <CategorizeCanvas
              notes={notes}
            />
          : <BoardCanvas
              boardId={board._id}
              notes={notes}
              user={user}
              auth={auth}
              addNote={addNote}
              deleteNote={deleteNote}
              updateNotePosition={updateNotePosition}
              handleCategorize={handleCategorize}
            />
      }
    </>

  );
};

export default CanvasContainer;
