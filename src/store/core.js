import { List, Map } from 'immutable';

export const INITIAL_STATE = Map({
  watchedDramas: List()
});

export function addDrama(state, drama) {
  return state.update('watchedDramas',
    watchedDramas => watchedDramas.push(Map(drama))
  );
}

export function removeDrama(state, dramaId) {
  let watchedDramas = state
    .get('watchedDramas')
    .filterNot(drama => drama.get('_id') === dramaId);

  return state.set('watchedDramas', watchedDramas);
}

export function setWatchedDramas(state, dramas) {
  dramas = dramas.map(drama => Map(drama));
  return state.set('watchedDramas', List(dramas));
}