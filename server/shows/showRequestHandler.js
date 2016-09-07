var Q = require('q');

var Show = require('./showModel.js');
var findShows = Q.nbind(Show.find, Show);
var findShow = Q.nbind(Show.findOne, Show);
var helpers = require('./helpers.js');

function addNewShow(req, res, next) {
  var query = req.body.searchQuery;
  var showId;
  var token;

  helpers.getToken()
    .then(function(returnedToken) {
      // set value of token so it can be
      // used throughout the promise chain
      token = returnedToken;
      return token;
    })
    .then(function() {
      return helpers.searchForShow(query, token);
    })
    .then(function(id) {
      showId = id;
    })
    .then(function() {
      return helpers.checkForShowInDb(showId);
    })
    .then(function(found) {
      // if show is already in DB,
      // break out of promise chain and send
      // back show info as response
      if (found) {
        res.status(200).send(found);
        throw new Error('this show is already in the database');
      }
      return showId;
    })
    .then(function() {
      return helpers.getShowInfo(showId, token);
    })
    .then(function(showInfo) {
      return helpers.addShowToDb(showInfo);
    })
    .then(function(show) {
      res.status(200).send(show);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getShows(req, res, next) {
  return findShows()
    .then(function(shows) {
      res.status(200).send(shows);
    })
    .catch(function(err) {
      if (err) return next(err);
    });
}

function removeShow(req, res, next) {
  return findShow({ _id: req.params.id })
    .then(function(show) {
      return show.remove();
    })
    .then(function(show) {
      res.status(200).send(show);
    })
    .catch(function(err) {
      if (err) return next(err);
    });
}

function updateShow(req, res, next) {
  if (req.body.rating) {
    findShow({ _id: req.params.id })
      .then(function(show) {
        return show.update({ rating: req.body.rating });
      })
      .then(function() {
        res.status(200).send('rating updated');
      })
      .catch(function(err) {
        return next(err);
      });
  }
}

module.exports = {
  addNewShow: addNewShow,
  getShows: getShows,
  removeShow: removeShow,
  updateShow: updateShow
};
