import React from 'react';
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector } from '../modules/board/slice';

const BoardContainer = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default BoardContainer;
