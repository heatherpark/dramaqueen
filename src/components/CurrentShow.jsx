import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import ReactStars from 'react-stars';

import { changeRatingInDb, removeDramaFromDb } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let { drama } = this.props
    let id = drama.get('_id');

    return (
      <div className="current-show">
        <h1>{drama.get('name')}</h1>
        <p>{drama.get('network')}</p>
        <p>{drama.get('firstAired')}</p>
        <ReactStars
          count={drama.get('rating')}
          onChange={store.dispatch(changeRatingInDb(newRating))}
          size={24}
          color2={'#ffd700'} />
        <p>{drama.get('overview')}</p>
        <button
          onClick={() => store.dispatch(removeDramaFromDb(id))}>Remove Drama</button>
      </div>
    )
  }
});