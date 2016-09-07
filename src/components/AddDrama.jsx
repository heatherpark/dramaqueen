import React from 'react';

import { fetchShow } from '../store/actions';
import store from '../index';

const AddDrama = () => {
  let input;

  return (
    <div className="add-show-container">
      <form onSubmit={e => {
        e.preventDefault()
        input.value.trim()
        store.dispatch(fetchShow(input.value))
        input.value = ''}}>
          {/* create reference to input node for form submission*/}
          <input type="text" ref={node => input = node} />
          <input type="submit" value="add drama" />
      </form>
    </div>
  )

}

export default AddDrama;
