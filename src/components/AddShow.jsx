import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { fetchShow } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let input

    return (
      <div className="add-show">
        <form onSubmit={e => {
          e.preventDefault()
          input.value.trim()
          store.dispatch(fetchShow(input.value))
          input.value = ''}}>
          {/* create reference to input node for form submission*/}
          <input ref={node => input = node} />
          <button type="submit">Add Show</button>
        </form>
      </div>
    )
  }
});