import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import CurrentShowsContainer from './CurrentShows';
import CurrentShow from './CurrentShow';

export default React.createClass({
  mixins: [PureRenderMixin],

  getCurrentShows: function() {
    return this.props.currentShows || [];
  },

  render: function() {
    return <div className="app-container">
      <CurrentShowsContainer />
    </div>
  }
});