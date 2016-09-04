import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="current-show">
      <h1>{this.props.show.name}</h1>
      <p>{this.props.show.overview}</p>
      <p className="remove-option">Remove Show</p>
    </div>
  }
});