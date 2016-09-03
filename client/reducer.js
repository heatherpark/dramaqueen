import { setCurrentShows, addShow, removeShow, toggleWatched, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CURRENT_SHOWS':
      return setCurrentShows(state, action.shows);
    case 'ADD_SHOW':
      return addShow(state, action.show);
    case 'REMOVE_SHOW':
      return removeShow(state, action.show);
    // TODO: modularize further
    case 'TOGGLE_WATCHED':
      return toggleWatched(state, action.show, action.episodeId);
  }
  return state;
}