var rp = require('request-promise');
var tvdbKey = require('../config/client.js').TVDB.API_KEY;
var Show = require('./showModel.js');
var Q = require('q');

var findShow = Q.nbind(Show.findOne, Show);
var saveShow = Q.nbind(Show.create, Show);
var updateShow = Q.nbind(Show.findOneAndUpdate, Show);
var tvdbUri = 'https://api.thetvdb.com';
var token;

var cloudinary = require('cloudinary');
var cloudinaryClient = require('../config/client.js');
cloudinary.config({
  cloud_name: cloudinaryClient.CLOUD_NAME,
  api_key: cloudinaryClient.API_KEY,
  api_secret: cloudinaryClient.API_SECRET
});

function addShowToDb(show) {
  console.log('show: ', show);
  var newShow = new Show({
    _id: show.id,
    name: show.seriesName,
    network: show.network,
    firstAired: show.firstAired,
    overview: show.overview
  });

  return saveShow(newShow);
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
    body: { apikey: tvdbKey },
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
  addShowToDb: addShowToDb,
  checkForShowInDb: checkForShowInDb,
  getToken: getToken,
  getShowInfo: getShowInfo,
  searchForShow: searchForShow
};