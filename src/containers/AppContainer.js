import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IntroPage from '../components/IntroPage';
import Header from '../components/Header';
import firebase from '../utils/firebase';
import api from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { initUser } from '../reducer/user';

const AppContainer = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const { email, displayName, photoURL } = await firebase.loginGoogle();

    const { token, user } = await api.post('/login', {
      email,
      username: displayName,
      imageSrc: photoURL,
    });

    localStorage.setItem('token', token);
    dispatch(initUser(user));
  };

  return (
    <Header onLogin={handleLogin}>
      <Switch>
        <Route exact path='/'>
          <IntroPage onLogin={handleLogin} />
        </Route>
      </Switch>
    </Header>
  );
};

export default AppContainer;
