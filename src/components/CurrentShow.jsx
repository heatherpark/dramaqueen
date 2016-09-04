import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return <div className="current-show">
      <h1>{this.props.show.name}</h1>
      <p>{this.props.show.overview}</p>
      <button>Episodes</button>
      <button className="remove-option">Remove Show</button>
    </div>
  }
});