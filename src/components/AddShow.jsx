import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { addShow } from '../actionCreators';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="add-show">
        <button
          className="add-show"
          onClick={() => addShow('Game of Thrones')}>Search for Show</button>
      </div>
    )
  }
});