import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

export const store = configureStore();
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