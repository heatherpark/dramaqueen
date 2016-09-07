import axios from 'axios';

/**
  * add show to list of watched dramas
**/

export function addShow(drama) {
  return {
    type: 'ADD_DRAMA',
    drama
  }
}

export function fetchShow(searchQuery) {
  return function(dispatch, getState) {
    return axios.post('/api/shows', { searchQuery })
      .then(res => {
        if (res.data.saved) {
          console.log(res.data.message);
        } else {
          let drama = res.data;
          dispatch(addShow(drama));
        }
      })
      .catch(err => console.log('error: ', err));
  }
}

/**
  * fetch all watched dramas
**/

export function addShows(dramas) {
  return {
    type: 'SET_WATCHED_DRAMAS',
    dramas
  }
}

export function fetchShows() {
  return function(dispatch, getState) {
    return axios.get('/api/shows')
      .then(res => dispatch(addShows(res.data)))
      .catch(err => console.log('error: ', err));
  }
}

/**
  * change rating of drama
**/

export function changeRatingInDb(rating, id) {
  return function(dispatch, getState) {
    return axios.put('/api/shows/' + id, { rating })
      .then(res => console.log('rating changed'))
      .catch(err => console.log('error: ', err));
  }
}

/**
  * remove drama from list of watched shows
**/

export function removeDrama(id) {
  return {
    type: 'REMOVE_DRAMA',
    id
  }
}

export function removeDramaFromDb(id) {
  return function(dispatch, getState) {
    return axios.delete('/api/shows/' + id)
      .then(res => dispatch(removeDrama(id)))
      .catch(err => console.log('error: ', err));
  }
}
