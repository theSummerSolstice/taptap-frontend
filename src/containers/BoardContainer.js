import React, { useEffect } from 'react';
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../modules/user/slice';
import { boardAction, boardSelector } from '../modules/board/slice';

const {
  getBoard,
} = boardAction;

const BoardContainer = () => {
  const { loading, board, error } = useSelector(boardSelector.all);
  const dispatch = useDispatch();
  const { board_id } = useParams();

  useEffect(() => {
    dispatch(getBoard(board_id));
  }, []);

  return (
    <div>
      <Board />
    </div>
  );
};

export default BoardContainer;
