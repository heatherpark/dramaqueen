import { connect } from 'react-redux';
import React from 'react';

import { fetchShows } from '../store/actions';
import WatchedDrama from './WatchedDrama';

/** dumb component **/
export class WatchedDramas extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchShows());
  }

  getWatchedDramas() {
    return this.props.watchedDramas || [];
  }

  render() {
    return (
      <div className="current-shows-container">
        {this.getWatchedDramas().map((drama, index) =>
          <WatchedDrama
            drama={drama}
            key={index} />
        )}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    watchedDramas: state.get('watchedDramas')
  }
}

/** smart component **/
// wraps dumb component with logic to keep it in sync with the store
// maps necessary props from state to CurrentShows component
export const WatchedDramasContainer = connect(mapStateToProps)(WatchedDramas);