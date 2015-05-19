process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require(`${appRoot}/config/express.js`)
  , mongoose = require(`${appRoot}/config/mongoose.js`);

var db = mongoose()
  , app = express();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000');
