var express = require('express')
  , morgan = require('morgan')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path');

var app = express();
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(stylus.middleware({
    src: __dirname
  , compile: compile
}));

function compile(str, path) {
  return stylus(str)
    .define('url', stylus.url({
      paths : [__dirname + "/public"],
      limit : 10000
    }))
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.use(express.static(__dirname + '/public'));


/**** Routes ****/

app.get('/', function(req, res) {
  res.render('home');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
  res.status(404);
  res.send('404 Error');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('500 Error');
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});