var showController = require('../shows/showRequestHandler.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  app.get('/api/shows', showController.getShows);
  app.post('/api/shows', showController.addNewShow);
  app.delete('/api/shows/:id', showController.removeShow);
  app.put('/api/shows/:id', showController.updateShow);

  app.use(helpers.errorHandler);
};