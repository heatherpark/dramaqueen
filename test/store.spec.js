import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import configureStore from '../src/store/configureStore';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = configureStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_CURRENT_SHOWS',
      shows: [
        {name: 'Friends'},
        {name: 'Will & Grace'}
      ]
    });
    expect(store.getState()).to.equal(fromJS({
      currentShows: [
        {name: 'Friends'},
        {name: 'Will & Grace'}
      ]
    }));
  });

});