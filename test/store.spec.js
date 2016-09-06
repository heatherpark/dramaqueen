import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import configureStore from '../src/store/configureStore';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = configureStore();
    expect(store.getState()).to.equal(Map({
      watchedDramas: List()
    }));

    store.dispatch({
      type: 'SET_WATCHED_DRAMAS',
      dramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    });
    expect(store.getState()).to.equal(fromJS({
      watchedDramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    }));
  });

});