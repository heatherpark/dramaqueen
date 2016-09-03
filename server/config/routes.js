var showController = require('../shows/show-request-handler.js');
var userController = require('../users/user-request-handler.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  app.get('/api/shows', showController.getShows);
  app.get('/api/shows/:id', showController.getShowById);
  app.post('/api/shows', showController.addNewShow);

  app.use(helpers.errorHandler);
};