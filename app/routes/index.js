module.exports = function(app) {
  var indexCtrl = require(`${appRoot}/app/controllers/index.js`);
  app.get('/', indexCtrl.renderIndex);
};