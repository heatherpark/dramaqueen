import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const withMiddleWare = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore() {
  return withMiddleWare(reducer);
}