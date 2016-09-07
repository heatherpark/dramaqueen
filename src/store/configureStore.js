import { createStore, applyMiddleware } from 'redux';
// thunk allows action creators to return functions instead of actions
// used here for asynchronous activity (server requests)
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const withMiddleWare = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore() {
  return withMiddleWare(reducer);
}