var mongoose = require('mongoose')
  , config = require('./config');

module.exports = function() {
  var db = mongoose.connect(config.db);

  // connect all the models
  // require('../app/models/model.js');

  return db;
};