import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../client/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
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