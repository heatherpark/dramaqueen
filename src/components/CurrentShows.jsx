import React from 'react';
import CurrentShow from './CurrentShow';

export default React.createClass({
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