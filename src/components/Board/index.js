import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Board.module.scss';
import BoardAside from '../BoardAside';
import BoardCanvas from '../BoardCanvas';

const Board = () => {
  const { board_id } = useParams();

  return (
    <div className={styles.container}>
      <BoardAside />
      <BoardCanvas />
    </div>
  );
};

export default Board;
