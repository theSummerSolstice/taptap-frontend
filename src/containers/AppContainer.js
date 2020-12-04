import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
import ListPage from '../components/ListPage';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { initUserStart } from '../redux/user/user.reducer';

const AppContainer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(initUserStart({ token: null }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;
    dispatch(initUserStart({ token }));
  }, []);

  return (
    <Header user={user} onLogin={handleLogin}>
      <Switch>
        <Route exact path='/'>
          <IntroPage onLogin={handleLogin} />
        </Route>
        <Route path='/main'>
          <MainPage user={user} />
        </Route>
        <Route path='/my-taptap'>
          <ListPage title='My taptap' list={user?.myBoards} />
        </Route>
        <Route path='/invited-taptap'>
          <ListPage title='Invited taptap' list={user?.authorizedBoards} />
        </Route>
      </Switch>
    </Header>
  );
};

export default AppContainer;
