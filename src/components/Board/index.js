import React from 'react';
import CanvasContainer from '../../containers/CanvasContainer';
import BoardAside from '../BoardAside';
import PropTypes from 'prop-types';
import styles from './Board.module.scss';

const Board = ({
  auth,
  board,
  leaveBoard,
  setIsCategorized,
}) => {
  return (
    <div className={styles.container}>
      <BoardAside
        auth={auth}
        board={board}
        leaveBoard={leaveBoard}
        setIsCategorized={setIsCategorized}
      />
      <CanvasContainer />
    </div>
  );
};

Board.propTypes = {
  auth: PropTypes.string.isRequired,
  board: PropTypes.shape({
    isCategorized: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }),
  leaveBoard: PropTypes.func.isRequired,
  setIsCategorized: PropTypes.func.isRequired,
};

export default Board;
