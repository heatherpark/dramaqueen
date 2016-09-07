var rp = require('request-promise');
var Q = require('q');

var Show = require('./showModel.js');
var findShow = Q.nbind(Show.findOne, Show);
var saveShow = Q.nbind(Show.create, Show);
var updateShow = Q.nbind(Show.findOneAndUpdate, Show);

var tvdbUri = 'https://api.thetvdb.com';
var token;

// configuration for API keys and deployment
var ENV = require('./client.js');
var client;

if (process.env.PORT) {
  client = ENV;
} else {
  client = require('../config/client.js');
}

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: client.CLOUDINARY.CLOUD_NAME,
  api_key: client.CLOUDINARY.API_KEY,
  api_secret: client.CLOUDINARY.API_SECRET
});

function addShowToDb(show) {
  var newShow = new Show({
    _id: show.id,
    name: show.seriesName,
    network: show.network,
    firstAired: show.firstAired,
    overview: show.overview,
    rating: 0
  });

  var bannerUrl = 'http://thetvdb.com/banners/' + show.banner;

  // save image to cloudinary and set resulting
  // cdn url to banner field value in Show instance
  return cloudinary.uploader
    .upload(bannerUrl)
    .then(function(res) {
      newShow.banner = res.url;
    })
    .then(function() {
      return saveShow(newShow);
    });
}

function checkForShowInDb(id) {
  return findShow({ _id: id })
    .then(function(show) {
      if (show) return show;
      return null;
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

// retrieves TVDB API authentication token
function getToken() {
  var options = {
    method: 'POST',
    uri: tvdbUri + '/login',
    body: { apikey: client.TVDB.API_KEY },
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

function getShowInfo(id, token) {
  var options = {
    uri: tvdbUri + '/series/' + id,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  return rp(options)
    .then(function(res) {
      var show = res.data;
      return show;
    });
}

function searchForShow(name, token) {
  var options = {
    uri: tvdbUri + '/search/series',
    qs: {
      name: name
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