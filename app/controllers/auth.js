var User = require('mongoose').model('User');

exports.renderAuthorize = function(req, res) {
  res.render('authorize', {
    path: req.path
  });
};

exports.signup = function(req, res, next) {
  var user = new User({
    name: req.body.name
  , email: req.body.email
  , password: req.body.password
  });

  user.save(function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.session.flash = {
        type: 'success'
      , intro: 'Great!'
      , message: 'You\'re all signed up now.'
      };

      console.log(user);

      res.redirect(303, '/');
    }
  });
};

exports.login = function(req, res) {
  res.send('Login coming soon!');
};
