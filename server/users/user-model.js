var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

// perform password encryption before saving user to database
userSchema.pre('save', function(next) {
  var user = this;
  // only hash password if it has been changed or is new
  if (!user.isModified('password')) return next();
  // generate salt to add to hashed password
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    // hash password
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // replace plain text password with hashed password
      user.password = hash;
      // move on to next middleware function
      next();
    });
  });
});

// compare typed hashed password to stored hashed password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err, null);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);