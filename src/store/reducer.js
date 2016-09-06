import { setWatchedDramas, addDrama, removeDrama, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_WATCHED_DRAMAS':
      return setWatchedDramas(state, action.dramas);
    case 'ADD_DRAMA':
      return addDrama(state, action.drama);
    case 'REMOVE_DRAMA':
      return removeDrama(state, action.id);
  }
  return state;
}