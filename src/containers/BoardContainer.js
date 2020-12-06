import React from 'react';
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../redux/user/slice';
import { boardSelector } from '../redux/board/slice';

const BoardContainer = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default BoardContainer;
