import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import { changeRatingInDb, removeDramaFromDb } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let { drama } = this.props
    let id = drama.get('_id');
    console.log('drama: ', drama);

    return (
      <div className="current-show">
        <h1>{drama.get('name')}</h1>
        <p>{drama.get('network')}</p>
        <p>{drama.get('firstAired')}</p>
        <StarRatingComponent
          name="drama-rating"
          value={drama.get('rating')}
          starCount={5}
          rating={drama.get('rating')}
          editing={true}
          onStarClick={rating => store.dispatch(changeRatingInDb(rating, id))} />
        <p>{drama.get('overview')}</p>
        <button
          onClick={() => store.dispatch(removeDramaFromDb(id))}>Remove Drama</button>
      </div>
    )
  }
});