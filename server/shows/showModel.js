var mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  network: String,
  firstAired: String,
  overview: String,
  banner: String,
  rating: Number
});

module.exports = mongoose.model('Show', showSchema);