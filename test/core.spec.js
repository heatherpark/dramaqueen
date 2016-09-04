import { List, Map } from 'immutable';
import { expect } from 'chai';

import { addShow, removeShow, setCurrentShows, toggleWatched } from '../src/core';

describe('application logic', () => {

  describe('setCurrentShows', () => {

    it('adds the current shows to the state', () => {
      const state = Map();
      const shows = [
        {name: 'Friends'},
        {name: 'Will & Grace'}
      ];
      const nextState = setCurrentShows(state, shows);

      expect(nextState).to.equal(Map({
        currentShows: List.of(
          Map({name: 'Friends'}),
          Map({name: 'Will & Grace'})
        )
      }));
    });

  });

  describe('addShow', () => {

    it('adds new show to list of current shows', () => {
      const state = Map({
        currentShows: List.of(
          Map({name: 'Friends'}),
          Map({name: 'Will & Grace'})
        )
      });
      const show = {name: 'Suits'};
      const nextState = addShow(state, show);

      expect(nextState).to.equal(Map({
        currentShows: List.of(
          Map({name: 'Friends'}),
          Map({name: 'Will & Grace'}),
          Map({name: 'Suits'})
        )
      }));
    });

  });

  describe('removeShow', () => {

    it('removes show from list of current shows', () => {
      const state = Map({
        currentShows: List.of(
          Map({name: 'Friends'}),
          Map({name: 'Will & Grace'}),
          Map({name: 'Suits'})
        )
      });
      const show = {name: 'Suits'};
      const nextState = removeShow(state, show);

      expect(nextState).to.equal(Map({
        currentShows: List.of(
          Map({name: 'Friends'}),
          Map({name: 'Will & Grace'})
        )
      }));
    });

  });

  describe('toggleWatched', () => {
    // TODO: modularize further
    it('toggles watched property on specified episode', () => {
      const state = Map({
        currentShows: List.of(
          Map(
            {
              name: 'Friends',
              episodes: List.of(Map({ id: 1, watched: false }))
            }
          ),
          Map(
            {
              name: 'Will & Grace',
              episodes: List.of(Map({ id: 1, watched: false }))
            }
          ),
          Map(
            {
              name: 'Suits',
              episodes: List.of(Map({ id: 1, watched: false }))
            }
          )
        )
      });
      const show = {name: 'Suits'};
      const nextState = toggleWatched(state, show);

      expect(nextState).to.equal(Map({
        currentShows: List.of(
          Map(
            {
              name: 'Friends',
              episodes: List.of(Map({ id: 1, watched: false }))
            }
          ),
          Map(
            {
              name: 'Will & Grace',
              episodes: List.of(Map({ id: 1, watched: false }))
            }
          ),
          Map(
            {
              name: 'Suits',
              episodes: List.of(Map({ id: 1, watched: true }))
            }
          )
        )
      }));
    });

  });
});