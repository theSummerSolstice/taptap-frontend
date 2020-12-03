import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

const middleware = [logger];

export default createStore(reducer, applyMiddleware(...middleware));
