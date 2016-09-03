import { setCurrentShows, addShow, removeShow, toggleWatched } from './core';

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_SHOWS':
      return setCurrentShows(state, action.shows);
    case 'ADD_SHOW':
      return addShow(state, action.show);
    case 'REMOVE_SHOW':
      return removeShow(state, action.show);
    case 'TOGGLE_WATCHED':
      return toggleWatched(state, action.show, action.episodeId);
  }
}