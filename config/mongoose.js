var mongoose = require('mongoose')
  , config = require(`${appRoot}/config/config.js`);

module.exports = function() {
  var db = mongoose.connect(config.db);

  // connect all the models
  require(`${appRoot}/app/models/user.js`);

  return db;
};