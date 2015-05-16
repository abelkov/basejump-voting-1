var express = require('express')
  , morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});