import { List, Map } from 'immutable';

export function setCurrentShows(state, shows) {
  shows = shows.map(show => Map(show));
  return state.set('currentShows', List(shows));
}

export function addShow(state, show) {
  return state.update('currentShows', currentShows => currentShows.push(Map(show)));
}

export function removeShow(state, show) {
  var currentShows = state
    .get('currentShows')
    .filterNot(currentShow => currentShow.get('name') === show.name);

  return state.set('currentShows', currentShows);
}

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