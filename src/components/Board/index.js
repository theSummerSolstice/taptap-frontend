import React from 'react';
import styles from './Board.module.scss';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';

const Board = ({ board }) => {
  return (
    <div className={styles.container}>
      <BoardAside board={board} />
      <BoardCanvas />
    </div>
  );
};

export default Board;
