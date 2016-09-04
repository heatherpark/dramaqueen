import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  removeShow(showId) {
    store.dispatch({
      type: 'REMOVE_SHOW',
      id: showId
    });
  },

  render() {
    const { show } = this.props;
    return (
      <div className="current-show">
        <h1>{this.props.show.get('name')}</h1>
        <p>{this.props.show.get('overview')}</p>
        <button>Episodes</button>
        <button
          className="remove-option"
          onClick={() => this.removeShow(show.get('id'))}>Remove Show</button>
      </div>
    )
  }
});