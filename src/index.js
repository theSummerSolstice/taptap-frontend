import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.module.scss';

import store from './store';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
