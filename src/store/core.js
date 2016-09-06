import { List, Map } from 'immutable';

export const INITIAL_STATE = Map({
  watchedDramas: List()
});

export function addDrama(state, drama) {
  return state.update('watchedDramas',
    watchedDramas => watchedDramas.push(Map(drama))
  );
}

export function changeRating(state, rating, dramaId) {
  let dramaIndex = state
    .get('watchedDramas')
    .findIndex(drama => drama.get('_id') === dramaId);

  let watchedDramas = state
    .updateIn(['watchedDramas', dramaIndex],
      drama => drama.set('rating', rating))

  return state.set('watchedDramas', watchedDramas);
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