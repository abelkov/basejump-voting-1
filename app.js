var express = require('express')
  , morgan = require('morgan')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path')
  , credentials = require('./credentials.js');

var app = express();
app.use(morgan('dev'));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(stylus.middleware({
    src: __dirname + '/public'
  , compile: compile
}));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.use(express.static(__dirname + '/public'));


/**** Routes ****/

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

app.get('/:var(signup|login)', function(req, res) {
  res.render('authorize', {
    path: req.path
  });
});

app.post('/signup', function(req, res) {
  res.send('Sign up coming soon!');
});

app.post('/login', function(req, res) {
  res.send('Login coming soon!');
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