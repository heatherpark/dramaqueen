var showController = require('../shows/showRequestHandler.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  app.get('/api/shows', showController.getShows);
  app.post('/api/shows', showController.addNewShow);
  app.post('/api/show', showController.removeShow);

  app.use(helpers.errorHandler);
};