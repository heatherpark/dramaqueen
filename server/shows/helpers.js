var rp = require('request-promise');
var key = require('../config/keys.js').TVDB.API_KEY;
var Show = require('./showModel.js');
var Q = require('q');

var findShow = Q.nbind(Show.findOne, Show);
var saveShow = Q.nbind(Show.create, Show);
var updateShow = Q.nbind(Show.findOneAndUpdate, Show);
var tvdbUri = 'https://api.thetvdb.com';
var token;

function addShowToDb(show) {
  var newShow = new Show({
    _id: show.id,
    name: show.seriesName,
    network: show.network,
    firstAired: show.firstAired,
    overview: show.overview
  });

  // TODO: process banner info
  // TODO: save show to DB and return show instance
}

function checkForShowInDb(showId) {
  return findShow({ _id: showId })
    .then(function(show) {
      if (show) {
        show.currentShow = true;
        return show;
      };
      return null;
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

function getToken() {
  var options = {
    method: 'POST',
    uri: tvdbUri + '/login',
    body: { apikey: key },
    json: true
  };

  return rp(options)
    .then(function(res) {
      return token = res.token;
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

function getShowInfo(showId, token) {
  var options = {
    uri: tvdbUri + '/series/' + showId,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  return rp(options)
    .then(function(res) {
      var showInfo = res.data;
      return showInfo;
    });
}

function searchForShow(showName, token) {
  var options = {
    uri: tvdbUri + '/search/series',
    qs: {
      name: showName
    },
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  return rp(options)
    .then(function(res) {
      return res.data[0].id;
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

module.exports = {
  getEpisodes: getEpisodes,
  addShowToDb: addShowToDb,
  checkForShowInDb: checkForShowInDb,
  getToken: getToken,
  getShowInfo: getShowInfo,
  searchForShow: searchForShow,
  toggleCurrentShow: toggleCurrentShow
};