import React from 'react';
import CanvasContainer from '../../containers/CanvasContainer';
import BoardAside from '../BoardAside';
import styles from './Board.module.scss';

const Board = ({
  user,
  auth,
  board,
  leaveBoard,
  setIsCategorized,
}) => {
  return (
    <div className={styles.container}>
      <BoardAside
        userId={user._id}
        auth={auth}
        board={board}
        leaveBoard={leaveBoard}
        setIsCategorized={setIsCategorized}
      />
      <CanvasContainer />
    </div>
  );
};

export default Board;
