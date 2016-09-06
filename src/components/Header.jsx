import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="add-show-container">
        <h1>drama queen!</h1>
      </div>
    )
  }
});