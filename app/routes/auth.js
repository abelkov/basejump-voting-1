module.exports = function(app) {
  var authCtrl = require(`${appRoot}/app/controllers/auth.js`);

  app.get('/:var(signup|login)', authCtrl.renderAuthorize);
  app.post('/signup', authCtrl.signup);
  app.post('/login', authCtrl.login);
};