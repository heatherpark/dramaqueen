import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

export const store = createStore(reducer);
store.dispatch({
  type: 'SET_CURRENT_SHOWS',
  shows: [{
    id: 1,
    name: 'Friends',
    overview: 'Overview of Friends'
  },
  {
    id: 2,
    name: 'Will & Grace',
    overview: 'Overview of Will & Grace'
  }]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);