var Show = require('./showModel.js');
var helpers = require('./helpers.js');

function addNewShow(req, res, next) {
  var searchQuery = req.body.searchQuery;
  var showId;
  var token;

  helpers.getToken()
    .then(function(returnedToken) {
      token = returnedToken;
      return token;
    })
    .then(function() {
      return helpers.searchForShow(searchQuery, token);
    })
    .then(function(id) {
      showId = id;
    })
    .then(function() {
      return helpers.checkForShowInDb(showId);
    })
    .then(function(found) {
      if (found) {
        res.status(200).send(found)
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

function getShowById(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    res.status(200).send(show);
  });
}

function getShows(req, res, next) {
  var query = Show.find();
  console.log(req.user);
  if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }

  query.exec(function(err, shows) {
    if (err) return next(err);
    res.status(200).send(shows);
  });
}

module.exports = {
  addNewShow: addNewShow,
  getShows: getShows,
  getShowById: getShowById
};
