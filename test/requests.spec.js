var request = require('supertest-as-promised');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server.js').app;

var Show = require('../server/shows/showModel.js');
var helpers = require('../server/shows/helpers.js');
var key = require('../server/config/keys.js').TVDB.API_KEY;

describe('Show-related server requests that require the database', function() {
  var shows = [
    {__v: 0, _id: 999998, name: 'Fake Show 1', episodes: [], currentShow: true},
    {__v: 0, _id: 999999, name: 'Fake Show 2', episodes: [], currentShow: false}
  ];

  // add to and delete mock data from DB
  before(function(done) {
    shows.forEach(function(show) { Show.create(show) });
    done();
  });

  after(function(done) {
    shows.forEach(function(show) { Show.remove(show).exec() });
    done();
  });

  it('Sending POST request with show ID as param should toggle currentShow property of show in DB', function(done) {
    request(app)
      .post('/api/shows/' + shows[1]._id)
      .expect(function(res) {
        expect(res.body.currentShow).to.equal(true);
      })
      .expect(200)
      .end(done);
  });

  it('Should be able to check if requested song already exists in DB', function(done) {
    helpers.checkForShowInDb(shows[0]._id)
      .then(function(show) {
        expect(show._id).to.equal(shows[0]._id);
        done();
      })
      .catch(function(err) {
        console.log('error: ', err);
        done();
      });
  });
});

describe('Show-related server requests that require the database', function() {
  var uri = 'https://api.thetvdb.com';
  var episodeId = 2075261;
  var showName = 'Pretty Little Liars';
  var showId = 146711;
  var token;

  // retrieve authentication token from TVDB API
  before(function(done) {
    request(uri)
      .post('/login')
      .send({apikey: key})
      .then(function(res) {
        token = res.body.token;
      })
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log('error: ', err);
        done();
      });
  });

  it('Be able to search TVDB for a show by name', function(done) {
    helpers.searchForShow(showName, token)
      .then(function(id) {
        expect(id).to.equal(showId);
        done();
      })
      .catch(function(err) {
        console.log('error: ', err);
        done();
      });
  });

  it('Be able to fetch show info by show ID', function(done) {
    helpers.getShowInfo(showId, token)
      .then(function(show) {
        expect(show.id).to.equal(showId);
        done();
      })
      .catch(function(err) {
        console.log('error: ', err);
        done();
      });
  });

  it('Be able to fetch episodes of a show by show ID', function(done) {
    helpers.getEpisodes(showId, token)
      .then(function(episodes) {
        expect(episodes[0].episodeName).to.equal('Pilot');
        done();
      })
      .catch(function(err) {
        console.log('error: ', err);
        done();
      });
  });
});

