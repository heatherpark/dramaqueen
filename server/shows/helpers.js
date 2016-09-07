var rp = require('request-promise');
var Q = require('q');

var Show = require('./showModel.js');
var findShow = Q.nbind(Show.findOne, Show);
var saveShow = Q.nbind(Show.create, Show);
var updateShow = Q.nbind(Show.findOneAndUpdate, Show);

var tvdbKey = require('../config/client.js').TVDB.API_KEY;
var tvdbUri = 'https://api.thetvdb.com';
var token;

var cloudinary = require('cloudinary');
var cloudinaryClient = require('../config/client.js').cloudinary;
cloudinary.config({
  cloud_name: cloudinaryClient.CLOUD_NAME,
  api_key: cloudinaryClient.API_KEY,
  api_secret: cloudinaryClient.API_SECRET
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