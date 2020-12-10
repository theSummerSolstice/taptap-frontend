import React from 'react';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';
import styles from './Board.module.scss';

const Board = ({
  board,
  notes,
  user,
  addNote,
  deleteNote,
  handleLeaveBoard,
  updateNotePosition,
  boardRef,
  handleCapture,
}) => {
  return (
    <div className={styles.container}>
      <BoardAside
        board={board}
        userId={user._id}
        handleLeaveBoard={handleLeaveBoard}
        handleCapture={handleCapture}
      />
      <BoardCanvas
        boardId={board._id}
        notes={notes}
        user={user}
        addNote={addNote}
        deleteNote={deleteNote}
        updateNotePosition={updateNotePosition}
        boardRef={boardRef}
      />
    </div>
  );
};

export default Board;
