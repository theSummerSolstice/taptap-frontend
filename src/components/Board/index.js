import React from 'react';
import styles from './Board.module.scss';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';

const Board = () => {
  return (
    <div className={styles.container}>
      <BoardAside />
      <BoardCanvas />
    </div>
  );
};

export default Board;
