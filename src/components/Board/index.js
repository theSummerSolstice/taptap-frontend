import React from 'react';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';
import styles from './Board.module.scss';

const Board = ({ board, notes, user, handleAddNote, handleDeleteNote }) => {
  return (
    <div className={styles.container}>
      <BoardAside board={board} />
      <BoardCanvas
        boardId={board._id}
        notes={notes}
        user={user}
        handleAddNote={handleAddNote}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default Board;
