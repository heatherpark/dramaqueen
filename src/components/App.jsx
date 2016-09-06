import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import '../style.css';

import AddShow from './AddShow';
import Header from './Header';
import { CurrentShowsContainer } from './CurrentShows';

export default React.createClass({
  render() {
    return (
      <div className="app-container">
        <div className="left-container">
          <div className="left-container-content">
            <Header />
            <AddShow />
          </div>
        </div>
        <CurrentShowsContainer />
      </div>
    )
  }
});