module.exports = function(app) {
  var authCtrl = require('../controllers/auth');

  app.get('/:var(signup|login)', authCtrl.renderAuthorize);
  app.post('/signup', authCtrl.signup);
  app.post('/login', authCtrl.login);
};