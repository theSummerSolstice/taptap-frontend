import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, initUser, deleteMyBoards } from '../modules/user/slice';
import { boardSelector, createBoard, updateBoard, leaveBoard } from '../modules/board/slice';

import HeaderContainer from './HeaderContainer';
import BoardContainer from './BoardContainer';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import NewBoardForm from '../components/NewBoardForm';
import InviteForm from '../components/InviteForm';
import ErrorView from '../components/ErrorView';
import ROUTE from '../constants/route';
import api from '../utils/api';

const AppContainer = () => {
  const [error, setError] = useState(null);
  const { user, error: userError } = useSelector(userSelector.all);
  const { board, error: boardError } = useSelector(boardSelector.all);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const routePage = (route) => history.push(route);
  const handleLogin = () => dispatch(initUser({ token: null }));
  const handleCreateBoard = (boardInfo) => dispatch(createBoard(boardInfo));
  const handleDeleteBoard = (boardId) => dispatch(deleteMyBoards(boardId));
  const handleUpdateBoard = (data) => dispatch(updateBoard(data));
  const handleLeaveBoard = () => {
    if (!board) return routePage(ROUTE.MAIN);
    if (!board.users) return;

    dispatch(leaveBoard({ boardId: board._id, userId: user._id }));
    routePage(ROUTE.MAIN);
  };

  const sendInviteMail = async (email, boardId) => {
    try {
      await api.post(`/board/${boardId}/invite`, { email });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return routePage(ROUTE.MAIN);
    }

    const currentLocation = location.pathname;
    dispatch(initUser());
    history.push(currentLocation);
  }, []);

  if (error || userError || boardError) {
    return (
    <ErrorView
      error={error || userError || boardError}
      routePage={routePage}
    />);
  }

  return (
    <HeaderContainer
      onLogin={handleLogin}
      routePage={routePage}
      updateBoard={handleUpdateBoard}
      leaveBoard={handleLeaveBoard}
      setError={setError}
    >
      <Switch>
        <Route exact path={ROUTE.MAIN}>
          {
            !user
              ? <IntroPage onLogin={handleLogin} />
              : <MainPage user={user} routePage={routePage} />
          }
        </Route>
        <Route path={ROUTE.MY_TAPTAP}>
          <ListPage
            userId={user?._id}
            title='My taptap'
            list={user?.myBoards}
            routePage={routePage}
            deleteBoard={handleDeleteBoard}
          />
        </Route>
        <Route path={ROUTE.INVITED_TAPTAP}>
          <ListPage
            title='Invited taptap'
            list={user?.authorizedBoards}
            routePage={routePage}
          />
        </Route>
        <Route path={ROUTE.BOARD_NEW}>
          <NewBoardForm
            user={user}
            routePage={routePage}
            createBoard={handleCreateBoard}
          />
        </Route>
        <Route path={ROUTE.BOARD_INVITE}>
          <InviteForm
            user={user}
            routePage={routePage}
            updateBoard={handleUpdateBoard}
            sendInviteMail={sendInviteMail}
          />
        </Route>
        <Route path={ROUTE.BOARD_ID}>
          <BoardContainer
            leaveBoard={handleLeaveBoard}
          />
        </Route>
        <Redirect to={ROUTE.MAIN} />
      </Switch>
    </HeaderContainer>
  );
};

export default AppContainer;
