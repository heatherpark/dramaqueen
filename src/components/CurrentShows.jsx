import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import CurrentShow from './CurrentShow';

/** dumb component **/
export const CurrentShows = React.createClass({
  mixins: [PureRenderMixin],

  getCurrentShows() {
    console.log(this.props.currentShows)
    return this.props.currentShows || [];
  },

  render() {
    return (
      <div className="current-shows">
        {this.getCurrentShows().map(show =>
          <CurrentShow
            show={show}
            key={show.get('name')} />
        )}
      </div>
    )
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