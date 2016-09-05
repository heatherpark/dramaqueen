import { List, Map } from 'immutable';

export const INITIAL_STATE = Map({
  currentShows: List()
});

export function setCurrentShows(state, shows) {
  shows = shows.map(show => Map(show));
  return state.set('currentShows', List(shows));
}

export function addShow(state, show) {
  return state.update('currentShows', currentShows => currentShows.push(Map(show)));
}

export function removeShow(state, showId) {
  var currentShows = state
    .get('currentShows')
    .filterNot(currentShow => currentShow.get('_id') === showId);
  return state.set('currentShows', currentShows);
}

// TODO: modularize further
export function toggleWatched(state, show, episodeId) {
  var showToUpdate = state
    .get('currentShows')
    .findIndex(targetShow => targetShow.get('name') === show.name);

  var episodeToUpdate = state
    .getIn(['currentShows', showToUpdate, 'episodes'])
    .findIndex(targetEpisode => targetEpisode.get('id') === episodeId);

  return state
    .updateIn(
      ['currentShows', showToUpdate, 'episodes', episodeToUpdate, 'watched'],
      watched => !watched
    );
}