import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_CURRENT_SHOWS',
  shows: [{
    name: 'Friends',
    overview: 'Overview of Friends'
  },
  {
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