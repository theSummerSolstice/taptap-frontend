import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, getBoard, setIsBoardCategorized } from '../modules/board/slice';

import queryString from 'query-string';
import Board from '../components/Board';
import Loader from '../components/Loader';

const BoardContainer = ({ leaveBoard }) => {
  const { user, auth } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const dispatch = useDispatch();
  const history = useHistory();
  const { board_id: boardId } = useParams();

  const handleIsCategorizedBoard = () => dispatch(setIsBoardCategorized(false));

  useEffect(() => {
    if (!user) {
      const currentBoardId = queryString.parseUrl(boardId).url;
      localStorage.setItem('boardId', currentBoardId);
      history.push('/');
      return;
    }

    localStorage.removeItem('boardId');
    const timerId = setTimeout(() => {
      dispatch(getBoard({ boardId, user }));
    }, 2000);

    return () => clearTimeout(timerId);
  }, [user]);

  if (!board) {
    return <Loader />;
  }

  return (
    <Board
      user={user}
      auth={auth}
      board={board}
      leaveBoard={leaveBoard}
      setIsCategorized={handleIsCategorizedBoard}
    />
  );
};

export default BoardContainer;
