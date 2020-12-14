import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';

import queryString from 'query-string';
import Board from '../components/Board';
import Loader from '../components/Loader';
import { notesSelector } from '../modules/currentNotes/slice';

const {
  getBoard,
  updateBoardSettings,
} = boardAction;

const BoardContainer = ({ handleLeaveBoard }) => {
  const { user, auth } = useSelector(userSelector.all);
  const { loading, board, error } = useSelector(boardSelector.all);
  const { notes } = useSelector(notesSelector.all);
  const dispatch = useDispatch();
  const { board_id } = useParams();
  const history = useHistory();

  const handleBackToBoard = () => {
    dispatch(updateBoardSettings(false));
  };

  useEffect(() => {
    if (!user) {
      const boardId = queryString.parseUrl(board_id).url;
      localStorage.setItem('boardId', boardId);
      history.push('/');
      return;
    }

    localStorage.removeItem('boardId');
    const timerId = setTimeout(() => {
      dispatch(getBoard({ boardId: board_id, user }));
    }, 2000);

    return () => clearTimeout(timerId);
  }, [user]);

  if (!board) {
    return <Loader />;
  }

  return (
    <div>
      <Board
        board={board}
        loading={loading}
        notes={notes}
        user={user}
        auth={auth}
        handleLeaveBoard={handleLeaveBoard}
        handleBackToBoard={handleBackToBoard}
      />
    </div>
  );
};

export default BoardContainer;
