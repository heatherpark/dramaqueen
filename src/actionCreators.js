import axios from 'axios';

export const removeShow = (id) => {
  // TODO: remove show from database
  return {
    type: 'REMOVE_SHOW',
    id
  }
}

export const addShow = (searchQuery) => {
  axios.post('/api/shows', { searchQuery })
    .then(response => console.log(response))
    .catch(err => console.log('error: ', err));
  // make POST request to server with searchQuery
  // if response is not null, dispatch action
  // if null, create message alert telling user searched show was not found
}