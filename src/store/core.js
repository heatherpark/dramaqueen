import { List, Map } from 'immutable';

export const INITIAL_STATE = Map({
  watchedDramas: List()
});

export function setWatchedDramas(state, dramas) {
  dramas = dramas.map(drama => Map(drama));
  return state.set('watchedDramas', List(dramas));
}

export function addDrama(state, drama) {
  return state.update('watchedDramas',
    watchedDramas => watchedDramas.push(Map(drama))
  );
}

export function removeDrama(state, dramaId) {
  var watchedDramas = state
    .get('watchedDramas')
    .filterNot(drama => drama.get('_id') === dramaId);
  return state.set('watchedDramas', watchedDramas);
}

// TODO: modularize further
// export function toggleWatched(state, drama, episodeId) {
//   var showToUpdate = state
//     .get('dramas')
//     .findIndex(targetShow => targetShow.get('name') === show.name);

//   var episodeToUpdate = state
//     .getIn(['dramas', showToUpdate, 'episodes'])
//     .findIndex(targetEpisode => targetEpisode.get('id') === episodeId);

//   return state
//     .updateIn(
//       ['dramas', showToUpdate, 'episodes', episodeToUpdate, 'watched'],
//       watched => !watched
//     );
// }