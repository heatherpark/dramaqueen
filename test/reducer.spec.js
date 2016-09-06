import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/store/reducer';

describe('reducer', () => {

  it('has an initial state', () => {
    const action = {
      type: 'SET_WATCHED_DRAMAS',
      dramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      watchedDramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    }));
  });

  it('handles SET_WATCHED_DRAMAS', () => {
    const initialState = Map({
      watchedDramas: List()
    });
    const action = {
      type: 'SET_WATCHED_DRAMAS',
      dramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      watchedDramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    }));
  });

  it('handles ADD_DRAMA', () => {
    const initialState = fromJS({
      watchedDramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'}
      ]
    });
    const action = {
      type: 'ADD_DRAMA',
      drama: {name: 'Descendants of the Sun'}
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      watchedDramas: [
        {name: 'Reply 1997'},
        {name: 'Misaeng'},
        {name: 'Descendants of the Sun'}
      ]
    }));
  });

  it('handles REMOVE_DRAMA', () => {
    const initialState = fromJS({
      watchedDramas: [
        {_id: 1, name: 'Reply 1997'},
        {_id: 2, name: 'Misaeng'},
        {_id: 3, name: 'Descendants of the Sun'}
      ]
    });
    const action = {
      type: 'REMOVE_DRAMA',
      id: 3
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      watchedDramas: [
        {_id: 1, name: 'Reply 1997'},
        {_id: 2, name: 'Misaeng'}
      ]
    }));
  });

});