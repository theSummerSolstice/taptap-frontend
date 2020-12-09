import React from 'react';
import styles from './Board.module.scss';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';

const Board = ({ board, notes, user, handleAddNote }) => {
  return (
    <div className={styles.container}>
      <BoardAside board={board} />
      <BoardCanvas
        boardId={board._id}
        notes={notes}
        user={user}
        handleAddNote={handleAddNote}
      />
    </div>
  );
};

export default Board;
