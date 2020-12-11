import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';

import queryString from 'query-string';
import Board from '../components/Board';

const {
  getBoard,
} = boardAction;

const BoardContainer = ({ handleLeaveBoard }) => {
  const { user, auth } = useSelector(userSelector.all);
  const { loading, board, error } = useSelector(boardSelector.all);
  const notes = useSelector((state) => state.NOTES);
  const dispatch = useDispatch();
  const { board_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      const boardId = queryString.parseUrl(board_id).url;
      localStorage.setItem('boardId', boardId);
      history.push('/');
      return;
    }

    localStorage.removeItem('boardId');
    dispatch(getBoard({ boardId: board_id, user }));
  }, []);

  if (!board) {
    return <div>Loading...</div>;
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
      />
    </div>
  );
};

export default BoardContainer;
