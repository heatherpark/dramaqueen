import axios from 'axios';

export function removeShow(id) {
  // TODO: remove show from database
  return {
    type: 'REMOVE_SHOW',
    id
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
