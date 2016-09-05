var rp = require('request-promise');
var key = require('../config/keys.js').TVDB.API_KEY;
var Show = require('./showModel.js');
var Q = require('q');

var findShow = Q.nbind(Show.findOne, Show);
var saveShow = Q.nbind(Show.create, Show);
var tvdbUri = 'https://api.thetvdb.com';
var token;

function getEpisodes(showId, token) {
  var options = {
    uri: tvdbUri + '/series/' + showId + '/episodes',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    qs: {
      page: '1'
    },
    json: true
  };

  return rp(options)
    .then(function(res) {
      var episodes = res.data;
      return episodes;
    });
}

function addShowToDb(show) {
  var newShow = new Show({
    _id: show.id,
    name: show.seriesName,
    airsDayOfWeek: show.airsDayOfWeek,
    airsTime: show.airsTime,
    network: show.network,
  });

  module.exports.getEpisodes(show.id, token)
    .then(function(episodes) {
      newShow.episodes = episodes;
      return newShow;
    })
    .then(function(show) {
      return saveShow(show);
    });
}

function checkForShowInDb(showId) {
  return findShow({ _id: showId })
    .then(function(show) {
      if (show) return show.name;
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

function getShowEpisodes(showId) {
  // send GET request to tvdb /series/:id/episodes
  // limit results to 10 pages
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
  getShowEpisodes: getShowEpisodes,
  getShowInfo: getShowInfo,
  searchForShow: searchForShow
};