import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../modules/user/slice';
import { boardSelector, createBoard, updateBoard, leaveBoard  } from '../modules/board/slice';
import { initUser, deleteMyBoards } from '../modules/user/slice';

import HeaderContainer from './HeaderContainer';
import BoardContainer from './BoardContainer';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import NewBoardForm from '../components/NewBoardForm';
import InviteForm from '../components/InviteForm';
import api from '../utils/api';

const AppContainer = () => {
  const { user } = useSelector(userSelector.all);
  const { board } = useSelector(boardSelector.all);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const routePage = (route) => history.push(route);
  const handleLogin = () => dispatch(initUser({ token: null }));
  const createNewBoard = (boardInfo) => dispatch(createBoard(boardInfo));
  const deleteBoard = (boardId) => dispatch(deleteMyBoards(boardId));
  const updateBoardItem = (data) => dispatch(updateBoard(data));

  const sendInviteMail = async (email, boardId) => {
    await api.post(`/board/${boardId}/invite`, { email });
  };

  const handleLeaveBoard = () => {
    if (!board) return routePage('/');

    dispatch(leaveBoard({ boardId: board._id, userId: user._id }));
    routePage('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return routePage('/');
    }

    const currentLocation = location.pathname;
    dispatch(initUser());
    history.push(currentLocation);
  }, []);

  return (
    <HeaderContainer
      onLogin={handleLogin}
      routePage={routePage}
      updateBoard={updateBoardItem}
      handleLeaveBoard={handleLeaveBoard}
    >
      <Switch>
        <Route exact path='/'>
          {
            !user
              ? <IntroPage onLogin={handleLogin} />
              : <MainPage user={user} routePage={routePage} />
          }
        </Route>
        <Route path='/my-taptap'>
          <ListPage
            userId={user?._id}
            title='My taptap'
            list={user?.myBoards}
            routePage={routePage}
            deleteBoard={deleteBoard}
          />
        </Route>
        <Route path='/invited-taptap'>
          <ListPage
            title='Invited taptap'
            list={user?.authorizedBoards}
            routePage={routePage}
          />
        </Route>
        <Route path='/board/new'>
          <NewBoardForm
            user={user}
            routePage={routePage}
            createNewBoard={createNewBoard}
          />
        </Route>
        <Route path='/board/:board_id/invite'>
          <InviteForm
            user={user}
            routePage={routePage}
            updateBoard={updateBoardItem}
            sendInviteMail={sendInviteMail}
          />
        </Route>
        <Route path='/board/:board_id'>
          <BoardContainer
            handleLeaveBoard={handleLeaveBoard}
          />
        </Route>
        <Redirect to='/'/>
      </Switch>
    </HeaderContainer>
  );
};

export default AppContainer;
