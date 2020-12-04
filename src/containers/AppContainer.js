import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IntroPage from '../components/IntroPage';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { initUserStart } from '../redux/user/user.reducer';

const AppContainer = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(initUserStart());
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
