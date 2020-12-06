import React from 'react';
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';

const BoardContainer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Board />
    </div>
  );
};

export default BoardContainer;
