import axios from 'axios';

export function removeShow(id) {
  return {
    type: 'REMOVE_SHOW',
    id
  }
}

export function toggleWatched(id) {
  console.log('axios: ', id);
  return function(dispatch, getState) {
    let state = getState();

    return axios.post('/api/shows/' + id)
      .then(res => {
        let id = res.data._id;
        dispatch(removeShow(id));
      })
      .catch(err => console.log('error: ', err));
  }
}

export function addShow(show) {
  return {
    type: 'ADD_SHOW',
    show
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
          let show = res.data;
          dispatch(addShow(show));
        }
      })
      .catch(err => console.log('error: ', err));
  }
}
