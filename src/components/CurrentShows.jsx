import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import CurrentShows from './CurrentShow';

const CurrentShows = React.createClass({
  mixins: [PureRenderMixin],

  getCurrentShows: function() {
    return this.props.currentShows || [];
  },

  render: function() {
    return <div className="current-shows">
      {this.getCurrentShows().map(show =>
        <CurrentShow
          key={show.name}
          show={show} />
      )}
    </div>
  }
});

function mapStateToProps(state) {
  return {
    currentShows: state.get('currentShows')
  };
}

connect(mapStateToProps)(CurrentShows);

export default CurrentShows;