import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { initUserStart } from '../redux/user/user.reducer';
import NewBoardForm from '../components/NewBoardForm';
import { useHistory } from 'react-router-dom';

const AppContainer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const routePage = (route) => {
    history.push(route);
  };

  const handleLogin = async () => {
    dispatch(initUserStart({ token: null }));
  };

  const createNewBoard = async () => {

  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;
    dispatch(initUserStart({ token }));
  }, []);

  return (
    <Header
      user={user}
      onLogin={handleLogin}
      routePage={routePage}
    >
      <Switch>
        <Route exact path='/'>
          <IntroPage onLogin={handleLogin} />
        </Route>
        <Route path='/boards'>
          <MainPage user={user} />
        </Route>
        <Route path='/my-taptap'>
          <ListPage title='My taptap' list={user?.myBoards} />
        </Route>
        <Route path='/invited-taptap'>
          <ListPage title='Invited taptap' list={user?.authorizedBoards} />
        </Route>
        <Route path='/board/new'>
          <NewBoardForm
            user={user}
            routePage={routePage}
            createNewBoard={createNewBoard}
          />
        </Route>
      </Switch>
    </Header>
  );
};

export default AppContainer;
