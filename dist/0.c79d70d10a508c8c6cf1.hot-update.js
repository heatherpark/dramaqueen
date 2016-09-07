webpackHotUpdate(0,{

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactAddonsPureRenderMixin = __webpack_require__(276);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _react = __webpack_require__(98);

	var _react2 = _interopRequireDefault(_react);

	var _reactStarRatingComponent = __webpack_require__(305);

	var _reactStarRatingComponent2 = _interopRequireDefault(_reactStarRatingComponent);

	var _actionCreators = __webpack_require__(280);

	var _index = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _default = _react2.default.createClass({
	  displayName: '_default',

	  mixins: [_reactAddonsPureRenderMixin2.default],

	  render: function render() {
	    var drama = this.props.drama;

	    var id = drama.get('_id');

	    return _react2.default.createElement(
	      'div',
	      { className: 'current-show' },
	      _react2.default.createElement(
	        'h1',
	        null,
	        drama.get('name')
	      ),
	      _react2.default.createElement('img', {
	        src: drama.get('banner') }),
	      _react2.default.createElement(
	        'p',
	        null,
	        drama.get('network')
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        drama.get('firstAired')
	      ),
	      _react2.default.createElement(_reactStarRatingComponent2.default, {
	        name: 'drama-rating',
	        value: drama.get('rating'),
	        starCount: 5,
	        rating: drama.get('rating'),
	        editing: true,
	        onStarClick: function onStarClick(rating) {
	          return _index.store.dispatch((0, _actionCreators.changeRatingInDb)(rating, id));
	        } }),
	      _react2.default.createElement(
	        'p',
	        null,
	        drama.get('overview')
	      ),
	      _react2.default.createElement(
	        'button',
	        {
	          onClick: function onClick() {
	            return _index.store.dispatch((0, _actionCreators.removeDramaFromDb)(id));
	          } },
	        'Remove Drama'
	      )
	    );
	  }
	});

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/Heather/portfolio/my-shows/src/components/CurrentShow.jsx');
	})();

	;

/***/ }

})