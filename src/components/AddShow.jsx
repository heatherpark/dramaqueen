import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { fetchShow } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="add-show">
        <button
          className="add-show"
          onClick={() => store.dispatch(fetchShow('Descendants of the Sun'))}>Search for Show</button>
      </div>
    )
  }
});