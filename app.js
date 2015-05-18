var path = require('path')
  , express = require('express')
  , morgan = require('morgan')
  , expressLogger = require('express-logger')
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , compression = require('compression')
  , stylus = require('stylus')
  , nib = require('nib')

  , credentials = require('./credentials.js');

var app = express();

app.get('env') === 'development'
  ? app.use(morgan('dev'))
  : app.use(expressLogger({
      path: __dirname + '/log/requests.log'
    }));

app.use(compression());

// Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Stylus
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

// Forms
app.use(bodyParser.urlencoded({ extended: true }));

// Session
app.use(expressSession({
  resave: false
, saveUninitialized: false
, secret: credentials.cookieSecret
}));

// Flash
app.use(function(req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

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
  var name = req.body.name
    , email = req.body.email
    , password = req.body.password;

  req.session.flash = {
    type: 'info'
  , intro: 'Thanks for trying...'
  , message: 'Sign up coming real soon now!'
  }

  res.redirect(303, '/');
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

/* Utility */

var l = console.log;