import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import { changeRatingInDb, removeDramaFromDb } from '../actionCreators';
import { store } from '../index';

export default React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let { drama } = this.props;
    let id = drama.get('_id');

    return (
      <div className="drama-container">
        <div className="drama-header">
          <div className="drama-info">
            <h2>{drama.get('name')}</h2>
            <p className="air-date"><span>First Aired:</span> {drama.get('firstAired')}</p>
            <StarRatingComponent
              name="drama-rating"
              value={drama.get('rating')}
              starCount={5}
              editing={true}
              onStarClick={rating => store.dispatch(changeRatingInDb(rating, id))} />
          </div>
          <figure className="drama-banner">
            <img
              src={drama.get('banner')} />
          </figure>
        </div>
        <p className="overview">{drama.get('overview')}</p>
        <a
          href="javaScript:void(0);"
          className="remove-drama-text"
          onClick={() => store.dispatch(removeDramaFromDb(id))}>remove drama</a>
      </div>
    )
  }
});
