import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { toggleWatched } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let { drama } = this.props

    return (
      <div className="current-show">
        <h1>{drama.get('name')}</h1>
        <p>{drama.get('network')}</p>
        <p>{drama.get('firstAired')}</p>
        <p>{drama.get('overview')}</p>
      </div>
    )
  }
});