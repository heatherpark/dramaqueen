import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import CurrentShow from './CurrentShow';
import { fetchShows } from '../actionCreators';
import { store } from '../index';

/** dumb component **/
export const CurrentShows = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount() {
    store.dispatch(fetchShows());
  },

  getWatchedDramas() {
    return this.props.watchedDramas || [];
  },

  render() {
    return (
      <div className="current-shows">
        {this.getWatchedDramas().map(drama =>
          <CurrentShow
            drama={drama}
            key={drama.get('name')} />
        )}
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    watchedDramas: state.get('watchedDramas')
  };
}

/** smart component **/
// wraps dumb component with logic to keep it in sync with the store
// maps necessary props from state to CurrentShows component
export const CurrentShowsContainer = connect(mapStateToProps)(CurrentShows);