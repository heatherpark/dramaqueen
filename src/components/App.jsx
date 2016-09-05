import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import AddShow from './AddShow';
import { CurrentShowsContainer } from './CurrentShows';

export default React.createClass({
  render() {
    return (
      <div className="app-container">
        <AddShow />
        <CurrentShowsContainer />
      </div>
    )
  }
});