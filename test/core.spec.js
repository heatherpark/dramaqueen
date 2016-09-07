import { List, Map } from 'immutable';
import { expect } from 'chai';

import { addDrama, removeDrama, setWatchedDramas } from '../src/store/core';

describe('application logic', () => {

  describe('setDramas', () => {

    it('adds watched dramas to the state', () => {
      const state = Map();
      const dramas = [
        {_id: 1, name: 'Reply 1997'},
        {_id: 2, name: 'Misaeng'}
      ];
      const nextState = setWatchedDramas(state, dramas);

      expect(nextState).to.equal(Map({
        watchedDramas: List.of(
          Map({_id: 1, name: 'Reply 1997'}),
          Map({_id: 2, name: 'Misaeng'})
        )
      }));
    });

  });

  describe('addDrama', () => {

    it('adds new show to list of watched dramas', () => {
      const state = Map({
        watchedDramas: List.of(
          Map({_id: 1, name: 'Reply 1997'}),
          Map({_id: 2, name: 'Misaeng'})
        )
      });
      const drama = {_id: 3, name: 'Descendants of the Sun'};
      const nextState = addDrama(state, drama);

      expect(nextState).to.equal(Map({
        watchedDramas: List.of(
          Map({_id: 1, name: 'Reply 1997'}),
          Map({_id: 2, name: 'Misaeng'}),
          Map({_id: 3, name: 'Descendants of the Sun'})
        )
      }));
    });

  });

  describe('removeDrama', () => {

    it('removes show from list of watched dramas', () => {
      const state = Map({
        watchedDramas: List.of(
          Map({_id: 1, name: 'Reply 1997'}),
          Map({_id: 2, name: 'Misaeng'}),
          Map({_id: 3, name: 'Descendants of the Sun'})
        )
      });
      const dramaId = 3;
      const nextState = removeDrama(state, dramaId);

      expect(nextState).to.equal(Map({
        watchedDramas: List.of(
          Map({_id: 1, name: 'Reply 1997'}),
          Map({_id: 2, name: 'Misaeng'})
        )
      }));
    });

  });

});