import React from 'react';
import BoardAside from '../BoardAside';
import styles from './Board.module.scss';
import CanvasContainer from '../../containers/CanvasContainer';

const Board = ({
  board,
  user,
  auth,
  handleLeaveBoard,
  handleCapture,
  handleBackToBoard,
}) => {
  return (
    <div className={styles.container}>
      <BoardAside
        board={board}
        userId={user._id}
        auth={auth}
        handleLeaveBoard={handleLeaveBoard}
        handleCapture={handleCapture}
        handleBackToBoard={handleBackToBoard}
      />
      <CanvasContainer />
    </div>
  );
};

export default Board;
