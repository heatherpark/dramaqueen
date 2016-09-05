var mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  currentShow: Boolean,
  airsDayOfWeek: String,
  airsTime: String,
  network: String,
  episodes: [{
    season: Number,
    episodeNumber: Number,
    episodeName: String,
    firstAired: Date,
    overview: String,
    watched: Boolean
  }]
});

module.exports = mongoose.model('Show', showSchema);