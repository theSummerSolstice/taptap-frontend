import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import IntroPage from '../components/IntroPage';
import MainPage from '../components/MainPage';
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
        <Route path='/boards'>
          <MainPage user={user} />
        </Route>
      </Switch>
    </Header>
  );
};

export default AppContainer;
