import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import CurrentShows from './CurrentShow';

/** dumb component **/
export CurrentShows = React.createClass({
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

/** smart component **/
// wraps dumb component with logic to keep it in sync with the store
// maps necessary props from state to CurrentShows component
export const CurrentShowsContainer = connect(mapStateToProps)(CurrentShows);