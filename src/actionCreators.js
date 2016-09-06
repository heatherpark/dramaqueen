import axios from 'axios';

export function addShow(drama) {
  return {
    type: 'ADD_DRAMA',
    drama
  }
}

export function addShows(shows) {

}

export function fetchShows() {
  return function(dispatch, getState) {
    let state = getState();

    return axios.get('/api/shows')
      .then(res => dispatch(addShows(shows)))
      .catch(err => console.log('error: ', err));
  }
}

export function fetchShow(searchQuery) {
  return function(dispatch, getState) {
    let state = getState();

    return axios.post('/api/shows', { searchQuery })
      .then(res => {
        if (res.data.saved) {
          // TODO: add alert for message
          console.log(res.data.message);
        } else {
          let drama = res.data;
          dispatch(addShow(drama));
        }
      })
      .catch(err => console.log('error: ', err));
  }
}

export function removeShow(id) {
  return {
    type: 'REMOVE_DRAMA',
    id
  }
}
