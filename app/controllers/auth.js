exports.renderAuthorize = function(req, res) {
  res.render('authorize', {
    path: req.path
  });
};

exports.signup = function(req, res) {
  // var name = req.body.name
  //   , email = req.body.email
  //   , password = req.body.password;

  req.session.flash = {
    type: 'info'
  , intro: 'Thanks for trying...'
  , message: 'Sign up coming real soon now!'
  }

  res.redirect(303, '/');
};

exports.login = function(req, res) {
  res.send('Login coming soon!');
};
