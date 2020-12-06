import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userAction, userSelector } from '../redux/user/slice';
import { boardAction } from '../redux/board/slice';
import BoardContainer from './BoardContainer';
import Header from '../components/Header';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import NewBoardForm from '../components/NewBoardForm';
import InviteForm from '../components/InviteForm';

const {
  initUser,
  deleteMyBoards,
} = userAction;

const {
  createBoard,
  updateBoard,
} = boardAction;

const AppContainer = () => {
  const { loading, user, error } = useSelector(userSelector.all);
  const dispatch = useDispatch();
  const history = useHistory();

  const routePage = (route) => {
    history.push(route);
  };

  const handleLogin = () => {
    dispatch(initUser({ token: null }));
  };

  const createNewBoard = (boardInfo) => {
    dispatch(createBoard(boardInfo));
  };

  const deleteBoard = (boardId) => {
    dispatch(deleteMyBoards(boardId));
  };

  const updateAuthorizedUsers = (data) => {
    dispatch(updateBoard(data));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;
    dispatch(initUser());
  }, []);

  return (
    <Header
      user={user}
      onLogin={handleLogin}
      routePage={routePage}
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
            updateAuthorizedUsers={updateAuthorizedUsers}
          />
        </Route>
        <Route path='/board/:board_id'>
          <BoardContainer />
        </Route>
      </Switch>
    </Header>
  );
};

export default AppContainer;
