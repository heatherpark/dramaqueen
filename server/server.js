var express = require('express');
var mongoose = require('mongoose');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/showtimedb';

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('err', console.error.bind(console,'connection error'));
db.once('open', function(){
  console.log('Mongodb connection open');
});

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on port " + port);

module.exports = {
  app: app,
  db: db
};