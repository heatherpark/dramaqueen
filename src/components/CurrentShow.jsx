import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { removeShow } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const { show } = this.props;
    const id = show.get('id');

    return (
      <div className="current-show">
        <h1>{show.get('name')}</h1>
        <p>{show.get('overview')}</p>
        <button>Episodes</button>
        <button
          className="remove-option"
          onClick={() => store.dispatch(removeShow(id))}>Remove Show</button>
      </div>
    )
  }
});