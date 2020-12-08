import React, { useEffect } from 'react';
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';

const {
  getBoard,
} = boardAction;

const BoardContainer = () => {
  const { user } = useSelector(userSelector.all);
  const { loading, board, error } = useSelector(boardSelector.all);
  const dispatch = useDispatch();
  const { board_id } = useParams();

  useEffect(() => {
    dispatch(getBoard({ boardId: board_id, userEmail: user.email }));
  }, []);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Board board={board} loading={loading} />
    </div>
  );
};

export default BoardContainer;
