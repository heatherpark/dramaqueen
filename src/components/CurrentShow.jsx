import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { toggleWatched } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let { show } = this.props
    let id = show.get('_id')

    return (
      <div className="current-show">
        <h1>{show.get('name')}</h1>
        <p>{show.get('network')}</p>
        <p>{show.get('firstAired')}</p>
        <p>{show.get('overview')}</p>
      </div>
    )
  }
});