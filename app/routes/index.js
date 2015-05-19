module.exports = function(app) {
  var indexCtrl = require('../controllers/index');
  app.get('/', indexCtrl.renderIndex);
};