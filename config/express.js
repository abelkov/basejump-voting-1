var l = console.log
  , path = require('path')
  , express = require('express')
  , morgan = require('morgan')
  , expressLogger = require('express-logger')
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , compression = require('compression')
  , stylus = require('stylus')
  , nib = require('nib')
  , config = require(`${appRoot}/config/config.js`);

module.exports = function() {

  var app = express();


  /**** Middleware ****/

  // Environment-specific stuff
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(expressLogger({
      path: `${appRoot}/log/requests.log`
    }));

    app.use(compression());
  }

  // Jade
  app.set('views', `${appRoot}/app/views`);
  app.set('view engine', 'jade');

  // Stylus
  app.use(stylus.middleware({
      src: `${appRoot}/public`
    , compile: compile
  }));

  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }

  // Forms
  app.use(bodyParser.urlencoded({ extended: true }));

  // Session
  app.use(expressSession({
    resave: false
  , saveUninitialized: false
  , secret: config.sessionSecret
  }));

  // Flash
  app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
  });

  // Static
  app.use(express.static(`${appRoot}/public`));


  /**** Routes ****/

  require(`${appRoot}/app/routes/index.js`)(app);
  require(`${appRoot}/app/routes/auth.js`)(app);


  /**** Error handlers ****/

  var errorCtrl = require(`${appRoot}/app/controllers/error.js`);

  app.use(errorCtrl.notFound);
  app.use(errorCtrl.serverError);

  return app;
};
