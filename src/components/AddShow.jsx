import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { fetchShow } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let input

    return (
      <div className="add-show-container">
        <div className="add-show-content">
          <h1>drama queen</h1>
          <form onSubmit={e => {
            e.preventDefault()
            input.value.trim()
            store.dispatch(fetchShow(input.value))
            input.value = ''}}>
            {/* create reference to input node for form submission*/}
            <input type="text" ref={node => input = node} />
            <input type="submit" value="add show" />
          </form>
        </div>
      </div>
    )
  }
});