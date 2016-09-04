import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    // { show } = this.props;
    return (
      <div className="current-show">
        <h1>{this.props.show.get('name')}</h1>
        <p>{this.props.show.get('overview')}</p>
        <button>Episodes</button>
        <button className="remove-option">Remove Show</button>
      </div>
    )
  }
});